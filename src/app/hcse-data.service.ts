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
  public h: number = 0;
  public s: number = 0;
  public l: number = 0;
  public hsl_string: string = "hsl(0, 0%, 0%)";
  public description: string = "";
  public keywords: string[] = [];
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
  n_hallmarks: Signal<number> = computed(() => this.hallmarks().length);
  n_keywords: Signal<number> = computed(() => Object.keys(this.keyword_ratings()).length);

  constructor(private http: HttpClient) {
  }

  public get_keyword_rating(keyword: string): KeywordRating {
    let ret: { keyword: string, rating: number[] } = {
      keyword, rating: []
    }

    if (this.are_keywords_loading()) {
      return ret
    } else {
      const r = this.keyword_ratings()[keyword];
      if (!r) return ret;
      ret.rating = r;
    }
    return ret;

  }

  keyword_ratings_to_dictionary(input: KeywordRating[]): KeywordDictionary {
    let ret: KeywordDictionary = {};
    input.forEach((k) => {
      ret[k.keyword] = k.rating;
    });
    return ret;
  }

  async initialize() {
    await this.load_keyword_dictionary();
    await this.load_publication_database();
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
      this.keyword_ratings.set(this.keyword_ratings_to_dictionary(obj.rating_output));
      console.log(this.n_keywords() + " keywords found.");
      this.hallmarks.set(this.complete_hallmark_descriptions(obj.hallmarks));
      console.log(this.n_hallmarks() + " hallmarks found.");
    } else {
      this.http.get<RatingFile>('/assets/' + fname).subscribe((data) => {
        this.keyword_ratings.set(this.keyword_ratings_to_dictionary(data.rating_output));
        this.hallmarks.set(this.complete_hallmark_descriptions(data.hallmarks));
        this.cacheFile(fname, this.json_to_blob(data));
      });
    }
  }

  public get_keywords_for_text(text: string): string[] {
    let ret: string[] = [];
    const words = this.split_input_into_possible_keywords(text);
    words.forEach(w => {
      if (this.keyword_ratings()[w]) {
        ret.push(w);
      }
    });
    return ret;
  }

  private split_input_into_possible_keywords(text: string): string[] {
    let cleared = text.replace(/[.?,;()!]/g, ' ');
    cleared = cleared.toLowerCase();
    let words = cleared.split(/\s+/).filter(word => word.length > 4);
    words.sort();
    words = Array.from(new Set(words));
    return words;
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
