import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';
import { KeywordRating } from '../util';
import { FormsModule } from '@angular/forms';
import { KeywordRatingComponent } from '../keyword-rating/keyword-rating.component';

const MAX_WORDS = 50;

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [FormsModule, KeywordRatingComponent],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent {
  term: WritableSignal<string> = signal("");
  keywords: Signal<KeywordRating[]> = computed(() => {
    let ret: KeywordRating[] = [];
    let results: number = 0;
    for (let key in this.data.keyword_ratings()) {
      if (key.indexOf(this.term()) != -1) {
        const new_item: KeywordRating = {
          keyword: key,
          rating: this.data.keyword_ratings()[key]
        }
        ret.push(new_item);
        results++;
      }
    }
    ret.sort((a, b) => {
      if (a.keyword < b.keyword) return -1;
      if (a.keyword > b.keyword) return 1;
      return 0;
    });

    return ret.slice(0, MAX_WORDS);
  });

  count: Signal<number> = computed(() => {
    return this.keywords().length;
  });

  count_string: Signal<string> = computed(() => {
    let ret: string = this.count().toString();
    if (this.count() == MAX_WORDS) {
      ret += "+";
    }
    return ret;
  });

  public hallmark_names: string[] = [];

  constructor(public data: HcseDataService) {
    this.hallmark_names = data.hallmark_names();
  }

}
