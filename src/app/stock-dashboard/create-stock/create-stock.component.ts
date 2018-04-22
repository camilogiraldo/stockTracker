import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { StockService } from '../../shared/stock.service';
import { UiService } from './../../shared/ui.service';
import { entraceAnimation } from './../../ui/animations';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss'],
  animations: [entraceAnimation]
})
export class CreateStockComponent implements OnInit, OnDestroy {
  goBackAllowed = true;
  loading = false;
  stocksAvailable = [];
  stockName = new FormControl();
  searchTerm$ = new Subject<string>();
  filteredOptions: Observable<string[]>;
  message = null;
  searchSubscription: Subscription;

  constructor(
    private stockService: StockService,
    public snackBar: MatSnackBar,
    private uiService: UiService
  ) {
    this.createSearchSubscription();
  }

  ngOnInit() {
    this.searchTerm$.subscribe(data => {
      this.loading = true;
      this.message = null;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  createSearchSubscription() {
    this.searchSubscription = this.stockService
      .searchStocks(this.searchTerm$)
      .subscribe(
        data => {
          if (data['securities'] && data['securities'] !== null) {
            this.loading = false;
            this.message = null;
            this.stocksAvailable = data['securities']['security'];
            this.filteredOptions = this.stockName.valueChanges.pipe(
              startWith(''),
              map(val => {
                return this.filter(val);
              })
            );
          } else {
            this.stocksAvailable = [];
            this.loading = false;
            data['securities'] !== null
              ? (this.message = 'Enter a stock symbol (/◕ヮ◕)/')
              : (this.message = '¯_(ツ)_/¯ No stock found !');
          }
        },
        error => {
          this.message = 'An error ocurred fetching stocks.  ¯_(ツ)_/¯ ';
          this.loading = false;
          console.log(error);
        }
      );
  }

  addStock(stockSymbol: string): void {
    this.stockService.saveStock(stockSymbol);
    this.uiService.openSnackBar(`STOCK ${stockSymbol} ADDED`, 'DONE');
  }
  private filter(val: string) {
    if (this.stocksAvailable.length >= 0) {
      return this.stocksAvailable.filter(
        option =>
          option['symbol'].toLowerCase().indexOf(val.toLowerCase()) === 0
      );
    } else {
      return this.stocksAvailable ? [this.stocksAvailable] : [];
    }
  }
}
