import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StockService } from './../../shared/stock.service';
import { entraceAnimation } from './../../ui/animations';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss'],
  animations: [entraceAnimation]
})
export class StockDetailComponent implements OnInit, OnDestroy {
  stockSymbolSubscription: Subscription;
  showCard = 'active';
  toolbarTitle: string;
  goBackAllowed = true;
  stockSymbol: string;
  errorMessage = null;
  response = [];
  loading = true;
  stockData = [];

  constructor(
    private stockService: StockService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.stockSymbolSubscription = this.router.params.subscribe(
      params => (this.stockSymbol = params['id'])
    );
    this.toolbarTitle = `${this.stockSymbol} STOCK DETAIL`;
    this.getStockDetails(this.stockSymbol);
  }

  getStockDetails(symbol) {
    this.stockService.getStockDetails(symbol).subscribe(
      data => {
        if (data['Time Series (60min)']) {
          this.response = data['Time Series (60min)'];
          Object.keys(this.response).forEach(el => {
            const stockDetailObj = {
              time: el,
              ...this.response[el]
            };
            this.stockData.push(stockDetailObj);
          });
          this.loading = false;
        } else {
          this.errorMessage =
            'An error ocurred fetching stock details.  ¯_(ツ)_/¯ ';
          this.loading = false;
          console.log('an error ocurred fetching stock details');
        }
      },
      error => {
        this.errorMessage =
          'An error ocurred fetching stock details.  ¯_(ツ)_/¯ ';
        this.loading = false;
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.stockSymbolSubscription.unsubscribe();
  }
}
