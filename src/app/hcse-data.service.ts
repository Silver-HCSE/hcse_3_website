import { Injectable, WritableSignal, Signal, signal, computed } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { openDB } from 'idb';
import { ArticleListItem, HallmarkDescription, KeywordDictionary, KeywordRating, PubmedArticle, RatingFile, RatingIdPair, euclideanDistance, json_to_blob, keyword_ratings_to_dictionary, norm_of_vector, norm_vector, split_input_into_possible_keywords } from './util';
import { Observable, map } from 'rxjs';
import { ArticleListCollection } from './article-list';
const DATABASE_NAME = 'HCSEFileCache';

@Injectable({
  providedIn: 'root'
})
export class HcseDataService {
  dbIsReady: boolean = false;
  dbIsLoading: boolean = false;
  db: any = {};
  keyword_ratings: WritableSignal<KeywordDictionary> = signal({});
  article_ratings: WritableSignal<RatingIdPair[]> = signal([]);
  hallmarks: WritableSignal<HallmarkDescription[]> = signal([]);
  hallmark_names: Signal<string[]> = computed(() => this.hallmarks().map(h => h.title));
  are_keywords_loading: Signal<boolean> = computed(() => this.n_keywords() == 0);
  are_articles_loading: Signal<boolean> = computed(() => this.n_articles() == 0);
  n_articles: Signal<number> = computed(() => this.article_ratings().length);
  n_hallmarks: Signal<number> = computed(() => this.hallmarks().length);
  n_keywords: Signal<number> = computed(() => Object.keys(this.keyword_ratings()).length);
  rating_file_progress = signal(0);
  article_file_progress = signal(0);
  average_rating: Signal<number[]> = computed(() => {
    let ret = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const article of this.article_ratings()) {
      for (let comp = 0; comp < ret.length; comp++) {
        ret[comp] += article.r[comp];
      }
    }
    for (let comp = 0; comp < ret.length; comp++) {
      ret[comp] /= this.article_ratings().length;
    }
    return ret;
  });

  private baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';

  constructor(private http: HttpClient) { }

  public get_keyword_rating(in_keyword: string): KeywordRating {
    const keyword = in_keyword.trim();
    let ret: { keyword: string, rating: number[] } = {
      keyword, rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    if (this.are_keywords_loading()) {
      return ret;
    } else {
      const r = (this.keyword_ratings())[keyword];
      if (!r) return ret;
      ret.rating = r;
    }
    return ret;
  }

  async initialize() {
    await this.load_keyword_dictionary();
    await this.load_publication_database();
  }

  initialize_for_test_framework(articles: RatingIdPair[], keywords: RatingFile) {
    this.article_ratings.set(articles);
    this.keyword_ratings.set(keyword_ratings_to_dictionary(keywords.rating_output));
    this.hallmarks.set(keywords.hallmarks);
  }

  async load_publication_database() {
    const fname = "article_database.json";
    if (await this.isFileCached(fname)) {
      let data = await this.getCachedFile(fname);
      this.article_ratings.set(JSON.parse(await data.text()));
      this.article_file_progress.set(100);
      console.log(this.article_ratings().length + " articles found.");
    } else {
      this.http.get<RatingIdPair[]>('/assets/' + fname, {
        reportProgress: true,
        observe: 'events',
      }).subscribe((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          if (event.total) {
            this.article_file_progress.set(Math.round((event.loaded / event.total) * 100));
          }
        } else if (event.type === HttpEventType.Response) {
          this.article_ratings.set(event.body || []);
          this.cacheFile(fname, json_to_blob(event.body));
          this.article_file_progress.set(100);
          console.log(this.article_ratings().length + " articles found.");
        }
      });
    }
  }

  complete_hallmark_descriptions(input: HallmarkDescription[]): HallmarkDescription[] {
    let ret = JSON.parse(JSON.stringify(input)) as HallmarkDescription[];
    for (let i = 0; i < ret.length; i++) {
      ret[i].h = Math.floor(i * 36);
      ret[i].s = 100;
      ret[i].l = 50;
      ret[i].hsl_string = "hsl(" + ret[i].h + ", " + ret[i].s + "%, " + ret[i].l + "%);";
      ret[i].keywords = this.get_keywords_for_text(ret[i].description);
    }
    return ret;
  }

  async load_keyword_dictionary() {
    const fname = "rating_database.json";
    if (await this.isFileCached(fname)) {
      let data = await this.getCachedFile(fname);
      let data_text = await data.text();
      let obj = JSON.parse(data_text) as RatingFile;
      this.keyword_ratings.set(keyword_ratings_to_dictionary(obj.rating_output));
      console.log(this.n_keywords() + " keywords found.");
      this.hallmarks.set(this.complete_hallmark_descriptions(obj.hallmarks));
      this.rating_file_progress.set(100);
      console.log(this.n_hallmarks() + " hallmarks found.");
    } else {
      this.http.get<RatingFile>('/assets/' + fname, {
        reportProgress: true,
        observe: 'events',
      }).subscribe((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          if (event.total) {
            this.rating_file_progress.set(Math.round((event.loaded / event.total) * 100));
          }
        } else if (event.type === HttpEventType.Response) {
          if(event.body) {
            this.keyword_ratings.set(keyword_ratings_to_dictionary(event.body.rating_output));
            this.hallmarks.set(this.complete_hallmark_descriptions(event.body.hallmarks));
            this.cacheFile(fname, json_to_blob(event.body));
            this.rating_file_progress.set(100);
          }
        }
      });
    }
  }

  public get_keywords_for_text(text: string): string[] {
    let ret: string[] = [];
    const words = split_input_into_possible_keywords(text);
    words.forEach(w => {
      if (this.keyword_ratings()[w]) {
        ret.push(w);
      }
    });
    return ret;
  }

  public get_rating_for_text(text: string): number[] {
    const keywords = split_input_into_possible_keywords(text, false);
    let rating = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const wordCounts: { [key: string]: number } = {};
    for (const word of keywords) {
      if (word in wordCounts) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    }

    for (const word in wordCounts) {
      const keyword_rating: KeywordRating = this.get_keyword_rating(word);
      const factor = Math.sqrt(wordCounts[word]);
      // we could check here if the word has a rating but this way we simply add zero. Same effect.
      for (let i = 0; i < 10; i++) {
        rating[i] += keyword_rating.rating[i] * factor;
      }
    }
    const computed_rating = norm_vector(rating);
    return computed_rating;
  }


  public async prepareDatabase() {
    if (this.dbIsReady) {
      return;
    }
    if (this.dbIsLoading) {
      while (this.dbIsLoading) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return;
    }
    this.dbIsLoading = true;
    this.db = await openDB(DATABASE_NAME, 2, {
      upgrade(db) {
        db.createObjectStore('files');
      },
    });
    this.dbIsReady = true;
    this.dbIsLoading = false;
  }

  private async isFileCached(filename: string): Promise<boolean> {
    if (!this.dbIsReady) {
      await this.prepareDatabase();
    }
    const readTransaction = this.db.transaction('files', 'readonly');
    const readStore = readTransaction.objectStore('files');
    const result = await readStore.get(filename);
    return !!result;
  }

  private async cacheFile(filename: string, blob: Blob) {
    if (!this.dbIsReady) {
      await this.prepareDatabase();
    }
    const readWriteTransaction = this.db.transaction('files', 'readwrite');
    const readWriteStore = readWriteTransaction.objectStore('files');
    await readWriteStore.put(blob, filename);
  }

  private async getCachedFile(filename: string): Promise<Blob> {
    if (!this.dbIsReady) {
      await this.prepareDatabase();
    }
    const readTransaction = this.db.transaction('files', 'readonly');
    const readStore = readTransaction.objectStore('files');
    const result = await readStore.get(filename);
    return new Blob([result], { type: "application/json" });
  }

  public findClosestObjects(inputVector: number[]): ArticleListCollection {
    let ret: ArticleListCollection = new ArticleListCollection();
    for (let article of this.article_ratings()) {
      let ali: ArticleListItem = {
        id: article.i,
        rating: article.r,
        distance: euclideanDistance(article.r, inputVector),
      };
      ret.add(ali);
    }
    return ret;
  }

  public findClosestObjectsForSearchTerm(searchString: string): ArticleListCollection {
    const rating = this.get_rating_for_text(searchString);
    if (norm_of_vector(rating) < 0.01) {
      return new ArticleListCollection();
    }
    let ret = this.findClosestObjects(rating);
    console.log(ret);
    return ret;
  }

  fetchArticles(ids: string[]): Observable<PubmedArticle[]> {
    let id_string = ids[0];
    for (let i = 1; i < ids.length; i++) {
      id_string += "," + ids[i];
    }

    const params = new HttpParams()
      .set('db', 'pmc')
      .set('id', id_string)
      .set('retmode', 'xml');

    return this.http.get(this.baseUrl, { params, responseType: 'text' }).pipe(
      map(response => this.parseXml(response, ids))
    );
  }

  private parseXml(xmlString: string, ids: string[]): PubmedArticle[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const article_elements = xmlDoc.getElementsByTagName("article");
    let ret: PubmedArticle[] = [];
    for (let i = 0; i < article_elements.length; i++) {
      let art = this.parseArticle(article_elements.item(i)!);
      art.id = ids[i];
      ret.push(art);
    }
    return ret;
  }

  private parseArticle(xmlDoc: Element): PubmedArticle {
    const article: PubmedArticle = {
      title: this.getTextContent(xmlDoc, 'article-title'),
      abstract: this.getTextContent(xmlDoc, 'abstract'),
      authors: this.getAuthorList(xmlDoc),
      journal: this.getTextContent(xmlDoc, 'journal-title'),
      pubDate: this.getTextContent(xmlDoc, 'pub-date'),
      id: this.getTextContent(xmlDoc, 'PMID')
    };
    return article;
  }

  private getTextContent(xmlDoc: Element, tagName: string): string {
    const element = xmlDoc.getElementsByTagName(tagName)[0];
    return element ? element.textContent || '' : '';
  }

  private getAuthorList(xmlDoc: Element): string[] {
    const authorElements = xmlDoc.getElementsByTagName('contrib');
    const authors: string[] = [];
    for (let i = 0; i < authorElements.length; i++) {
      let temp_element = authorElements[i].getElementsByTagName('surname')[0];
      const lastName = temp_element ? temp_element.textContent || '' : '';
      temp_element = authorElements[i].getElementsByTagName('given-names')[0];
      const firstName = temp_element ? temp_element.textContent || '' : '';
      authors.push(`${firstName} ${lastName}`);
    }
    return authors;
  }
}

