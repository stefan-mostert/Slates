import { Slate } from './../../models/slate';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './../../reducers';
import * as slateActions from './../../actions/slate.actions';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  isSlatesLoading$: Observable<boolean>;
  slates$: Observable<Slate[]>;
  selectedSlate$: Observable<Slate>;


  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.slates$ = this.store.let(fromRoot.getSlates);
    this.isSlatesLoading$ = this.store.let(fromRoot.getIsSlatesLoading);
    this.selectedSlate$ = this.store.let(fromRoot.getSelectedSlate);
    this.store.dispatch(new slateActions.SlatesLoading(''));
  }

  selectedSlate(name: string) {
    this.store.dispatch(new slateActions.SlateSelected(name));
  }
}
