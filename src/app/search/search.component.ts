import { Component } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaperComponent } from '../paper/paper.component';
import { ArticleListCollection } from '../article-list';
import { PubmedArticle } from '../util';
import { Observable } from 'rxjs';
import {
  HlmAccordionModule,
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PaperComponent, HlmAccordionModule, HlmAccordionDirective, HlmAccordionContentComponent, HlmAccordionIconDirective, HlmAccordionItemDirective, HlmAccordionTriggerDirective, HlmButtonDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = "";
  results: ArticleListCollection;
  articles: Observable<PubmedArticle[]> | null = null;
  page = 0;
  badRequest = false;

  constructor(private data_service: HcseDataService) {
    this.results = new ArticleListCollection();
  }

  public startSearch() {
    this.results = this.data_service.findClosestObjectsForSearchTerm(this.searchTerm);
    if (this.results.size != 0) {
      this.load_article_page();
      this.badRequest = false;
    } else {
      this.badRequest = true;
    }
  }

  public load_article_page() {
    console.log("Loading articles");
    this.articles = this.data_service.fetchArticles(this.results.get_page(this.page).map((article) => article.id));
  }

  public can_go_to_next_page() {
    return this.results.get_page(this.page + 1).length > 0
  }

  public nextPage() {
    if (this.can_go_to_next_page()) {
      this.page += 1;
      this.load_article_page();
    }
  }

  public previousPage() {
    this.page = Math.max(this.page - 1, 0);
    this.load_article_page();
  }
}
