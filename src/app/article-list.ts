import { ArticleListItem } from "./util";

const ARTICLE_LIST_CUTOFF_COUNT = 100;
const TEMPORARY_OVERFLOW_LIMIT = 10;

export class ArticleListCollection {

  public articles: ArticleListItem[] = [];
  private distance_cutoff: number = 1;
  public size = 0;

  add(article: ArticleListItem) {
    if (!article.distance) {
      return
    }
    if (this.articles.length > ARTICLE_LIST_CUTOFF_COUNT) {
      if (article.distance > this.distance_cutoff) {
        return
      }
    }
    this.binaryInsert(article);
    if (this.articles.length > ARTICLE_LIST_CUTOFF_COUNT + TEMPORARY_OVERFLOW_LIMIT) {
      this.truncate_list();
    }
    this.update_size();
  }

  update_size() {
    this.size = Math.min(this.articles.length, ARTICLE_LIST_CUTOFF_COUNT);
  }

  truncate_list() {
    this.articles.splice(ARTICLE_LIST_CUTOFF_COUNT);
    this.distance_cutoff = this.articles[ARTICLE_LIST_CUTOFF_COUNT - 1].distance!;
  }

  get_page(page: number, page_size: number = 10) {
    return this.articles.slice(page * page_size, (page + 1) * page_size);
  }

  binaryInsert(item: ArticleListItem): void {
    if (!item.distance) {
      return
    }
    let left = 0;
    let right = this.articles.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.articles[mid].distance === item.distance) {
        this.articles.splice(mid, 0, item);
        return;
      } else if (this.articles[mid].distance! < item.distance) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    this.articles.splice(left, 0, item);
  }
}
