import 'rxjs/add/observable/timer';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PopupComponent } from '../ui/popup/popup.component';
import { StockService } from './../shared/stock.service';
import { UiService } from './../shared/ui.service';
import { controlAnimation, stockAnimation } from './../ui/animations';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss'],
  animations: [stockAnimation, controlAnimation]
})
export class StockDashboardComponent implements OnInit, OnDestroy {
  updateInterval: number;
  checked = false;
  loading = true;
  startMessage = null;
  timerSubscription: Subscription;
  stockUpdateSubscription: Subscription;
  popupSelection: number;
  trackedStocks;

  constructor(
    private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private uiService: UiService
  ) {}

  ngOnInit() {
    const initialStocks = this.stockService.getTrackedStocks();
    this.updateInterval = this.uiService.getUpdateInterval();
    if (initialStocks) {
      this.showStocks(initialStocks);
    } else {
      this.startMessage = `Let's start adding a stock to track.`;
      this.loading = false;
    }
  }

  showStocks(stocks: string) {
    this.stockService.getStockStatus(stocks).subscribe(
      data => {
        this.trackedStocks = data['Stock Quotes'];
        this.loading = false;
      },
      error => {
        this.startMessage =
          'An error ocurred fetching stock dashboard.  ¯_(ツ)_/¯ ';
        this.loading = false;
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.stockUpdateSubscription) {
      this.stockUpdateSubscription.unsubscribe();
    }
  }

  openDialog(): void {
    this.updateInterval = this.uiService.getUpdateInterval();
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { value: this.updateInterval }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.popupSelection = result['refreshTime'];
      this.uiService.saveUpdateInterval(this.popupSelection * 1000); // Convert to ms
      this.updateInterval = this.popupSelection * 1000;
      this.uiService.openSnackBar(
        `INTERVAL SET TO ${this.popupSelection} MINS`,
        'DONE'
      );
      this.refreshData();
    });
  }

  onDelete(stockSymbol: string, index: string) {
    this.trackedStocks.splice(index, 1);
    this.stockService.removeStock(stockSymbol);
    this.uiService.openSnackBar(`${stockSymbol} DELETED`, 'GOT IT');
    if (this.trackedStocks.length === 0) {
      this.startMessage = `Don't forget to track some stocks.`;
      this.trackedStocks = null;
    }
  }

  onNewStock() {
    this.router.navigate(['./create'], { relativeTo: this.route });
  }

  onAutoUpdate() {
    this.checked = !this.checked;
    this.checked
      ? this.uiService.openSnackBar(
          `AUTO UPDATE ${this.updateInterval / 1000} MIN ACTIVE `,
          'GOT IT'
        )
      : this.uiService.openSnackBar(
          `AUTO UPDATE ${this.updateInterval / 1000} MIN INACTIVE`,
          'GOT IT'
        );
    this.refreshData();
  }

  private refreshData() {
    if (this.checked) {
      const stocks = this.stockService.getTrackedStocks();
      this.stockUpdateSubscription = this.stockService
        .getStockStatus(stocks)
        .subscribe(data => {
          this.trackedStocks = data['Stock Quotes'];
          this.subcribeToData();
        });
    }
  }

  private subcribeToData() {
    const updateTime = this.uiService.getUpdateInterval();
    this.timerSubscription = Observable.timer(updateTime * 60).subscribe(() =>
      this.refreshData()
    );
  }
}
