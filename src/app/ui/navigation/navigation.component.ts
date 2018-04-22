import { arrowAnimation } from './../animations';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [arrowAnimation]
})
export class NavigationComponent implements OnInit {
  @Input() toolbarTitle;
  @Input() goBackAllowed;
  constructor() {}

  ngOnInit() {}
}
