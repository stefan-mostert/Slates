import { SlateRemoved } from './../../actions/slate.actions';
import { Slate } from './../../models/slate';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slate-main',
  templateUrl: './slate-main.component.html',
  styleUrls: ['./slate-main.component.scss']
})
export class SlateMainComponent implements OnInit {

  @Input() slate: Slate;
  @Input() slateId: number;
  @Output() closed = new EventEmitter<number>();

  isDoubleDigits = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slate'] && this.slate) {
      this.isDoubleDigits = this.slate.powerRating > 9;
    }
  }

  closeClicked() {
    this.closed.emit(this.slateId);
  }

}
