import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StockService {
  private readonly API_KEY = 'HMU7E4HKFLQ59V19';
  private readonly BASE_URL = 'https://www.alphavantage.co/query?';
  private readonly GET_STOCK_FUNCTION = 'function=BATCH_STOCK_QUOTES&symbols=';
  private readonly GET_STOCK_DETAILS = 'function=TIME_SERIES_INTRADAY&symbol=';
  private readonly SERIES_INTERVAL = '&interval=60min';
  private readonly EXCHANGES = '&exchanges=Q,N';

  private readonly LOOKUP_API = 'https://sandbox.tradier.com/v1/markets/lookup?q=';
  private readonly ACCESS_TOKEN = 'N3AqSj726iPPcYkYKA1ET2BPZpcu';

  constructor(private http: HttpClient) {}

  createStock(stockSymbol: string) {
    return this.http
      .get(this.LOOKUP_API + stockSymbol, {
        headers: this.authorization
      })
      .pipe(catchError(this.handleError));
  }

  searchStocks(nameFilter: Observable<string>) {
    return nameFilter
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(name => {
        return this.getSymbols(name);
      });
  }

  private getSymbols(nameFilter: string): Observable<Object> {
    return nameFilter.length === 0
      ? Observable.of([])
      : this.http
          .get(this.LOOKUP_API + nameFilter + this.EXCHANGES, {
            headers: this.authorization
          })
          .pipe(catchError(this.handleError));
  }

  getStockStatus(stocksTracked: string): Observable<Object> {
    const queryParams =
      this.GET_STOCK_FUNCTION + stocksTracked + '&apikey=' + this.API_KEY;
    return this.http
      .get(this.BASE_URL + queryParams)
      .pipe(catchError(this.handleError));
  }

  getStockDetails(stockSymbol: string): Observable<Object> {
    const queryParams =
      this.GET_STOCK_DETAILS +
      stockSymbol +
      this.SERIES_INTERVAL +
      '&apikey=' +
      this.API_KEY;
    return this.http
      .get(this.BASE_URL + queryParams)
      .pipe(catchError(this.handleError));
  }

  removeStock(stockId: string): void {
    const stocks = this.getTrackedStocks().split(',');
    if (stocks.indexOf(stockId) > -1) {
      const index = stocks.indexOf(stockId);
      stocks.splice(index, 1);
    }
    localStorage.setItem('stocks', btoa(stocks.join(',')));
  }

  saveStock(stockSymbol: string): void {
    localStorage.setItem('stocks', this.encodeStocks(stockSymbol));
  }

  private encodeStocks(stockSymbol: string): string {
    if (localStorage.getItem('stocks')) {
      const stocksTracked = atob(localStorage.getItem('stocks')).split(',');
      if (!(stocksTracked.indexOf(stockSymbol) > -1)) {
        stocksTracked.push(stockSymbol);
      }
      return btoa(stocksTracked.join(','));
    } else {
      return btoa([stockSymbol].join(','));
    }
  }

  getTrackedStocks(): string {
    return localStorage.getItem('stocks')
      ? atob(localStorage.getItem('stocks'))
      : null;
  }

  get authorization(): { Authorization: string } {
    return {
      Authorization: 'Bearer ' + this.ACCESS_TOKEN
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return new ErrorObservable(
      'Something bad happened; please try again later.'
    );
  }
}
