import { Injectable, WritableSignal, Signal, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';
const DATABASE_NAME = 'HCSEFileCache';

class RatingIdPair {
  public i: string = "";
  public r: number[] = [];
}

class RatingFile {
  public hallmarks: HallmarkDescription[] = [];
  public rating_output: KeywordRating[] = [];
}

class HallmarkDescription {
  public title: string = "";
  public description: string = "";
}

class KeywordDictionary {
 [key: string]: number[];
}

class KeywordRating {
  public keyword: string = "";
  public rating: number[] = [];
}

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
  are_keywords_loading: Signal<boolean> = computed(() => this.n_keywords() == 0);
  are_articles_loading: Signal<boolean> = computed(() => this.n_articles() == 0);
  n_articles: Signal<number> = computed(() => this.article_ratings().length);
  n_hallmarks:  Signal<number> = computed(() => this.hallmarks().length);
  n_keywords:  Signal<number> = computed(() => Object.keys(this.keyword_ratings()).length);

  constructor(private http: HttpClient) {
  }

  public get_keyword_rating(keyword: string): KeywordRating {
    let ret: {keyword: string, rating: number[]} = {
      keyword, rating: []
    }

    if(this.are_keywords_loading()) {
      return ret
    } else {
      const r = this.keyword_ratings()[keyword];
      if (!r) return ret;
      ret.rating = r;
    }
    return ret;

  }

  keyword_ratings_to_dictionary( input: KeywordRating[]) : KeywordDictionary {
    let ret: KeywordDictionary = {};
    input.forEach((k) => {
      ret[k.keyword] = k.rating;
      });
      return ret;
  }

  async initialize() {
    await this.load_publication_database();
    await this.load_keyword_dictionary();
  }

  async load_publication_database() {
    const fname = "article_database.json";
    if (await this.isFileCached(fname)) {
      let data = await this.getCachedFile(fname);
      this.article_ratings.set(JSON.parse(await data.text()));
      console.log(this.article_ratings().length + " articles found.");
    } else {
      this.http.get<RatingIdPair[]>('/assets/' + fname).subscribe((data) => {
        this.article_ratings.set(data);
        this.cacheFile(fname, this.json_to_blob(data));
      console.log(this.article_ratings().length + " articles found.");

      });
    }
  }


  json_to_blob(data: any): Blob {
    const str = JSON.stringify(data);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    return blob;
  }

  async load_keyword_dictionary() {
    const fname = "rating_database.json";
    if (await this.isFileCached(fname)) {
      let data = await this.getCachedFile(fname);
      let data_text = await data.text();
      let obj = JSON.parse(data_text) as RatingFile;
      this.hallmarks.set(obj.hallmarks);
      console.log(this.n_hallmarks() + " hallmarks found.");
      this.keyword_ratings.set(this.keyword_ratings_to_dictionary(obj.rating_output));
      console.log(this.n_keywords() + " keywords found.");
    } else {
      this.http.get<RatingFile>('/assets/' + fname).subscribe((data) => {
        this.keyword_ratings.set(this.keyword_ratings_to_dictionary(data.rating_output));
        this.hallmarks.set(data.hallmarks);
        this.cacheFile(fname, this.json_to_blob(data));
      });
    }
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

}
