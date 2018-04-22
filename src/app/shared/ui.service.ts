import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService {
  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  saveUpdateInterval(timeInMs: number): void {
    const addMinutes = timeInMs * 60;
    localStorage.setItem('updateInterval', `${addMinutes}`);
  }

  getUpdateInterval(): number {
    return localStorage.getItem('updateInterval')
      ? +localStorage.getItem('updateInterval') / 60
      : 300000 / 60;
  }
}
