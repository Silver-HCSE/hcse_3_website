import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'keyword-rating',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './keyword-rating.component.html',
  styleUrl: './keyword-rating.component.scss'
})
export class KeywordRatingComponent implements OnInit {
  @Input() rating: number[] = [];
  @Input() hallmark_names: string[] = [];
  @Input() keyword: string = "";

  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [],
  };

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      }
    }
  };

  ngOnInit() {
    this.doughnutChartData = {

      labels: this.hallmark_names,
      datasets: [
        { data: this.rating },
      ],
    };
  }
  public doughnutChartType: ChartType = 'doughnut';

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

}
