import { Component, Input } from '@angular/core';
import { TuiArcChartModule } from '@taiga-ui/addon-charts';

@Component({
  selector: 'keyword-rating',
  standalone: true,
  imports: [
    TuiArcChartModule],
  templateUrl: './keyword-rating.component.html',
  styleUrl: './keyword-rating.component.scss'
})
export class KeywordRatingComponent {
  @Input() rating: number[] = [];
  @Input() keyword: string = "";
  activeItem = NaN;

}
