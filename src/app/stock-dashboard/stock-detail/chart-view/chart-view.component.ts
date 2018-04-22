import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
  @Input() stockData;
  public lineChartType = 'line';
  public priceChartData: Array<number> = [];
  public timeChartData: Array<any> = [];
  public priceChart: Array<any> = [];

  constructor() {}

  ngOnInit() {
    this.populateChartData();
  }

  private populateChartData() {
    this.stockData.forEach(stockDetail => {
      Object.keys(stockDetail).forEach(el => {
        if (el === 'time') {
          this.timeChartData.push(stockDetail[el]);
        } else {
          if (el === '1. open') {
            this.priceChartData.push(stockDetail[el]);
          }
        }
      });
    });
    this.timeChartData.reverse();
    this.priceChart.push({
      data: this.priceChartData.reverse(),
      label: 'Stock Price (USD)'
    });
  }
}
