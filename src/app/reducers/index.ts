import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromSlate from './slate.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  slate: fromSlate.SlateState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  slate: fromSlate.reducer
};

const developmentReducer: ActionReducer<State> = combineReducers(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
    //TODO:
    //   if (environment.production) {
    //     return productionReducer(state, action);
    //   }
    //   else {
    //     return developmentReducer(state, action);
    //   }
}

/**
 * Unit Reducer
 */
export function getSlateState(state$: Observable<State>) {
  return state$.select(s => s.slate);
}

export const getSlates = compose(fromSlate.getSlates, getSlateState);
export const getWeapons = compose(fromSlate.getWeapons, getSlateState);
export const getAbilities = compose(fromSlate.getAbilities, getSlateState);
export const getIsSlatesLoading = compose(fromSlate.getIsSlatesLoading, getSlateState);
export const getIsWeaponsLoading = compose(fromSlate.getIsWeaponsLoading, getSlateState);
export const getIsAbilitiesLoading = compose(fromSlate.getIsAbilitiesLoading, getSlateState);
export const getSelectedFaction = compose(fromSlate.getSelectedFaction, getSlateState);
export const getSelectedSlates = compose(fromSlate.getSelectedSlates, getSlateState);
