import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { StockService } from './shared/stock.service';
import { UiService } from './shared/ui.service';
import { CreateStockComponent } from './stock-dashboard/create-stock/create-stock.component';
import { StockDashboardComponent } from './stock-dashboard/stock-dashboard.component';
import { ChartViewComponent } from './stock-dashboard/stock-detail/chart-view/chart-view.component';
import { StockDetailComponent } from './stock-dashboard/stock-detail/stock-detail.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { PopupComponent } from './ui/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    StockDashboardComponent,
    StockDetailComponent,
    LoaderComponent,
    CreateStockComponent,
    ChartViewComponent,
    PopupComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [StockService, UiService],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
