import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateStockComponent } from './stock-dashboard/create-stock/create-stock.component';
import { StockDashboardComponent } from './stock-dashboard/stock-dashboard.component';
import { StockDetailComponent } from './stock-dashboard/stock-detail/stock-detail.component';

const router: Routes = [
  { path: '', redirectTo: 'stock-dashboard', pathMatch: 'full' },
  {
    path: 'stock-dashboard',
    children: [
      { path: '', component: StockDashboardComponent },
      { path: 'create', component: CreateStockComponent }
    ]
  },
  { path: 'detail/:id', component: StockDetailComponent },
  { path: '**', redirectTo: 'stock-dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
