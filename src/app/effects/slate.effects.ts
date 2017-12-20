import { Slate } from './../models/slate';
import { getSlates } from './../reducers/index';
import { SlateService } from './../services/slate.service';
import { WeaponService } from './../services/weapon.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as fromRoot from './../reducers';
import * as slateActions from '../actions/slate.actions';

@Injectable()
export class SlateEffects {

    constructor(private actions$: Actions,
    private slateService: SlateService,
    private weaponService: WeaponService,
    private store: Store<fromRoot.State>) { }

    // tslint:disable-next-line:member-ordering
    @Effect()
    getSlates$: Observable<Action> = this.actions$
        .ofType(slateActions.ActionTypes.SLATES_LOADING)
        .map((action: slateActions.SlatesLoading) => action)
        .switchMap(action => {
            return this.slateService.getSlates(action.payload)
            .map(response => {
              return new slateActions.SlatesLoaded(response);
            });
        });

    // tslint:disable-next-line:member-ordering
    @Effect()
    getWeapons$: Observable<Action> = this.actions$
        .ofType(slateActions.ActionTypes.WEAPONS_LOADING)
        .map((action: slateActions.WeaponsLoading) => action)
        .switchMap(action => {
            return this.weaponService.getWeapons(action.payload)
            .map(response => {
                return new slateActions.WeaponsLoaded(response);
            });
        });

}
