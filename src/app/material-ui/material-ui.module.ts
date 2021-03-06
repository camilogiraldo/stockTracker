import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule
  ]
})
export class MaterialUiModule {}
