import { Component, Input } from '@angular/core';

@Component({
  selector: 'keyword-rating',
  standalone: true,
  imports: [],
  templateUrl: './keyword-rating.component.html',
  styleUrl: './keyword-rating.component.scss'
})
export class KeywordRatingComponent {
  @Input() rating: number[] = [];
  @Input() keyword: string = "";
  activeItem = NaN;

}
