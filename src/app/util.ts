export interface PubmedArticle {
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  pubDate: string;
  id: string;
}

export class ArticleListItem {
  id: string = "";
  rating: number[] = [];
  distance?: number;
}

export class RatingIdPair {
  public i: string = "";
  public r: number[] = [];
}

export class RatingFile {
  public hallmarks: HallmarkDescription[] = [];
  public rating_output: KeywordRating[] = [];
}

export class HallmarkDescription {
  public title: string = "";
  public h: number = 0;
  public s: number = 0;
  public l: number = 0;
  public hsl_string: string = "hsl(0, 0%, 0%)";
  public description: string = "";
  public keywords: string[] = [];
}

export class KeywordDictionary {
  [key: string]: number[];
}

export class KeywordRating {
  public keyword: string = "";
  public rating: number[] = [];
}

export function euclideanDistance(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must be of the same length');
  }
  let sum = 0;
  for (let i = 0; i < vec1.length; i++) {
    sum += (vec1[i] - vec2[i]) ** 2;
  }
  return Math.sqrt(sum);
}

export function split_input_into_possible_keywords(text: string, deduplicate: boolean = true): string[] {
  let cleared = text.replace(/[.?,;()!]/g, ' ');
  cleared = cleared.toLowerCase();
  let words = cleared.split(/\s+/).filter(word => word.length > 4);
  words = words.map((w) => w.trim());
  words.sort();
  if (deduplicate) {
    words = Array.from(new Set(words));
  }
  return words;
}

export function json_to_blob(data: any): Blob {
  const str = JSON.stringify(data);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
  return blob;
}

export function keyword_ratings_to_dictionary(input: KeywordRating[]): KeywordDictionary {
  let ret: KeywordDictionary = {};
  input.forEach((k) => {
    ret[k.keyword.trim()] = k.rating;
  });
  return ret;
}

export function norm_of_vector(input: number[]): number {
  let ret = 0;
  input.forEach(i => {
    ret += i * i;
  });
  return Math.sqrt(ret);
}

export function norm_vector(input_vector: number[]): number[] {
  const norm = norm_of_vector(input_vector);
  if (norm > 0) {
    let ret = input_vector;
    ret.map(i => i / norm);
    return ret;
  } else {
    return input_vector;
  }
}
