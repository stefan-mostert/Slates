import { Slate } from './../../models/slate';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slate-main',
  templateUrl: './slate-main.component.html',
  styleUrls: ['./slate-main.component.scss']
})
export class SlateMainComponent implements OnInit {

  @Input() slate: Slate;

  isDoubleDigits = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slate'] && this.slate) {
      this.isDoubleDigits = this.slate.powerRating > 9;
    }
  }

}
