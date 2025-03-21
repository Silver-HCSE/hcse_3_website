export interface PubmedArticle {
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  pubDate: string;
  id: string;
}

export class ArticleListItem {
  id = '';
  rating: number[] = [];
  distance?: number;
}

export class RatingIdPair {
  public i = '';
  public r: number[] = [];
}

export class RatingFile {
  public hallmarks: HallmarkDescription[] = [];
  public rating_output: KeywordRating[] = [];
}

export class HallmarkDescription {
  public title = '';
  public h = 0;
  public s = 0;
  public l = 0;
  public hsl_string = 'hsl(0, 0%, 0%)';
  public description = '';
  public keywords: string[] = [];
}

export class KeywordDictionary {
  [key: string]: number[];
}

export class KeywordRating {
  public keyword = '';
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

export function split_input_into_possible_keywords(
  text: string,
  deduplicate = true,
): string[] {
  let cleared = text.replace(/[.?,;()!'"%=/\\-]/g, ' ');
  cleared = cleared.toLowerCase();
  let words = cleared
    .split(/\s+/)
    .map((word) => remove_leading_and_trailing_hyphens(word))
    .filter((word) => word.length > 4);
  words = words.map((w) => w.trim());
  words.sort();
  if (deduplicate) {
    words = Array.from(new Set(words));
  }
  return words;
}

export function remove_leading_and_trailing_hyphens(keyword: string): string {
  let ret = keyword;
  let has_changed = true;
  while (has_changed) {
    has_changed = false;
    const first_letter = ret[0];
    const last_letter = ret[ret.length - 1];
    if (ret.length > 4) {
      if (first_letter == '-') {
        ret = ret.substring(1);
        has_changed = true;
      }
      if (last_letter == '-') {
        ret = ret.substring(0, ret.length - 1);
        has_changed = true;
      }
    }
  }
  return ret;
}

export function json_to_blob(data: object | null): Blob {
  const str = JSON.stringify(data);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
  return blob;
}

export function keyword_ratings_to_dictionary(
  input: KeywordRating[],
): KeywordDictionary {
  const ret: KeywordDictionary = {};
  input.forEach((k) => {
    ret[k.keyword.trim()] = k.rating;
  });
  return ret;
}

export function norm_of_vector(input: number[]): number {
  let ret = 0;
  input.forEach((i) => {
    ret += i;
  });
  return ret;
}

export function norm_vector(input_vector: number[]): number[] {
  const norm = norm_of_vector(input_vector);
  if (norm > 0) {
    return input_vector.map((i) => i / norm);
  } else {
    return input_vector;
  }
}
