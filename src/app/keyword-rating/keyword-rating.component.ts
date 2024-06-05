import { Component, Input } from '@angular/core';
import { TuiArcChartModule } from '@taiga-ui/addon-charts';
import { HcseDataService } from '../hcse-data.service';
import { TuiLegendItemModule } from '@taiga-ui/addon-charts';
import { TuiHoveredModule } from '@taiga-ui/cdk';

@Component({
  selector: 'keyword-rating',
  standalone: true,
  imports: [
    TuiArcChartModule,
    TuiLegendItemModule,
    TuiHoveredModule],
  templateUrl: './keyword-rating.component.html',
  styleUrl: './keyword-rating.component.scss'
})
export class KeywordRatingComponent {
  @Input() rating: number[] = [];
  @Input() keyword: string = "";
  activeItemIndex = NaN;
  labels = [];

  constructor(public data_service: HcseDataService) {

  }

  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : 0;
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }

}
