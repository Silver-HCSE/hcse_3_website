import { Component, Input, OnChanges } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';
import { KeywordRatingComponent } from '../keyword-rating/keyword-rating.component';

@Component({
  selector: 'app-keyword-wrapper',
  imports: [KeywordRatingComponent],
  templateUrl: './keyword-wrapper.component.html',
  styleUrl: './keyword-wrapper.component.scss',
})
export class KeywordWrapperComponent implements OnChanges {
  @Input() word = '';
  rating: number[] = [];

  constructor(private data_service: HcseDataService) {}

  ngOnChanges(): void {
    this.rating = this.data_service.get_keyword_rating(this.word).rating;
    console.log(this.rating);
  }
}
