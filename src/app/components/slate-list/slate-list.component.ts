import { Slate } from './../../models/slate';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slate-list',
  templateUrl: './slate-list.component.html',
  styleUrls: ['./slate-list.component.scss']
})
export class SlateListComponent implements OnInit {

  @Input() isLoading = true;
  @Input() slates: Slate[];
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectSlate(slateId: string) {
    this.selected.emit(slateId);
  }
}
