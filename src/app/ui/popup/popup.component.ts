import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  updateTime = [
    { label: '1 mins', value: 1 },
    { label: '2 mins', value: 2 },
    { label: '5 mins', value: 5 },
    { label: '15 mins', value: 15 },
    { label: '30 mins', value: 30 },
    { label: '60 mins', value: 60 }
  ];

  valueSelected;
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
    const selectedValue = this.updateTime.filter((el, index) => {
      return el.value === this.data.value / 1000
        ? this.updateTime[index]
        : null;
    });
    this.valueSelected = selectedValue[0];
  }

  onSave() {
    this.dialogRef.close({ refreshTime: this.valueSelected.value });
  }
}
