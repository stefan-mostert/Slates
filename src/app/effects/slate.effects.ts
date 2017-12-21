import { Slate } from './../models/slate';
import { getSlates, getAbilities } from './../reducers/index';
import { SlateService } from './../services/slate.service';
import { WeaponService } from './../services/weapon.service';
import { AbilityService } from './../services/ability.service';
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
    private abilityService: AbilityService,
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

    // tslint:disable-next-line:member-ordering
    @Effect()
    getAbilities$: Observable<Action> = this.actions$
        .ofType(slateActions.ActionTypes.ABILITIES_LOADING)
        .map((action: slateActions.AbilitiesLoading) => action)
        .switchMap(action => {
            return this.abilityService.getAbilities(action.payload)
            .map(response => {
                return new slateActions.AbilitiesLoaded(response);
            });
        });

}
