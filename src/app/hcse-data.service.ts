import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';
const DATABASE_NAME = 'HCSEFileCache';
class RatingIdPair {

  public i: String = "";
  public r: number[] = [];
}

class RatingFile {
  public hallmarks: HallmarkDescription[] = [];
  public rating_output: KeywordRating[] = [];
}

class HallmarkDescription {
  public title: String = "";
  public description: String = "";
}

class KeywordRating {
  public keyword: String = "";
  public rating: number[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class HcseDataService {
  dbIsReady: boolean;
  dbIsLoading: boolean;
  db: any;
  keyword_ratings: KeywordRating[];
  article_ratings: RatingIdPair[];
  hallmarks: HallmarkDescription[];

  constructor(private http: HttpClient) {
    this.dbIsLoading = false;
    this.dbIsReady = false;
    this.hallmarks = [];
    this.article_ratings = [];
    this.keyword_ratings = [];
  }

  async initialize() {
    await this.load_publication_database();
    await this.load_keyword_dictionary();
  }

  async load_publication_database() {
    const fname = "article_database.json";
    if (await this.isFileCached(fname)) {
      let data = await this.getCachedFile(fname);
      this.article_ratings = JSON.parse(await data.text());
    } else {
      this.http.get<RatingIdPair[]>('/assets/' + fname).subscribe((data) => {
        this.article_ratings = data;
        this.cacheFile(fname, this.json_to_blob(data));
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
    const fname = "article_database.json";
    if (await this.isFileCached(fname)) {
      let data = await this.getCachedFile(fname);
      let data_text = await data.text();
      let obj = JSON.parse(data_text) as RatingFile;
      this.hallmarks = obj.hallmarks;
      this.keyword_ratings = obj.rating_output;
    } else {
      this.http.get<RatingFile>('/assets/' + fname).subscribe((data) => {
        this.keyword_ratings = data.rating_output;
        this.hallmarks = data.hallmarks;
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
