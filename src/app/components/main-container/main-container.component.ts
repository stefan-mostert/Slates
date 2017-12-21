import { getSelectedFaction } from './../../reducers/index';
import { Slate, Weapon, Ability } from './../../models/slate';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './../../reducers';
import * as slateActions from './../../actions/slate.actions';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  isSlatesLoading$: Observable<boolean>;
  isWeaponsLoading$: Observable<boolean>;
  isAbilitiesLoading$: Observable<boolean>;
  slates$: Observable<Slate[]>;
  weapons$: Observable<Weapon[]>;
  abilities$: Observable<Ability[]>;
  selectedSlates$: Observable<Slate[]>;
  selectedFaction$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.slates$ = this.store.let(fromRoot.getSlates);
    this.weapons$ = this.store.let(fromRoot.getWeapons);
    this.abilities$ = this.store.let(fromRoot.getAbilities);
    this.isSlatesLoading$ = this.store.let(fromRoot.getIsSlatesLoading);
    this.isWeaponsLoading$ = this.store.let(fromRoot.getIsWeaponsLoading);
    this.isAbilitiesLoading$ = this.store.let(fromRoot.getIsAbilitiesLoading);
    this.selectedFaction$ = this.store.let(fromRoot.getSelectedFaction);
    this.selectedSlates$ = this.store.let(fromRoot.getSelectedSlates);
    this.store.dispatch(new slateActions.SlatesLoading('da'));
    this.store.dispatch(new slateActions.WeaponsLoading('da'));
    this.store.dispatch(new slateActions.AbilitiesLoading('da'));
  }

  selectedSlate(name: string) {
    this.store.dispatch(new slateActions.SlateSelected(name));
  }

  changeFaction(factionname) {
    this.store.dispatch(new slateActions.SlatesLoading(factionname));
  }

  slateClosed(slateIndex) {
   this.store.dispatch(new slateActions.SlateRemoved(slateIndex));
  }
}
