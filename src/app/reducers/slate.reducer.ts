import { Slate } from './../models/slate';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as slateActions from './../actions/slate.actions';

export interface SlateState {
  isSlatesLoading: boolean;
  selectedFaction: string;
  slates: Slate[];
  selectedSlates: Slate[];
}

const initialState: SlateState = {
  isSlatesLoading: true,
  selectedFaction: '',
  slates: [],
  selectedSlates: []
};

export function reducer(state = initialState, action: slateActions.Actions): SlateState {
  switch (action.type) {

    case slateActions.ActionTypes.SLATES_LOADING:
        return Object.assign({}, state, {
          isSlatesLoading: true,
          selectedFaction: action.payload,
          slates: [],
          selectedSlates: []
        });

    case slateActions.ActionTypes.SLATES_LOADED:
        return Object.assign({}, state, {
          isSlatesLoading: false,
          slates: action.payload,
          selectedSlates: []
        });

    case slateActions.ActionTypes.SLATE_SELECTED:
      const foundSlate = state.slates.find(s => s.name === action.payload);
      return Object.assign({}, state, {
        isSlatesLoading: false,
        selectedSlates: [...state.selectedSlates, foundSlate]
      });

    case slateActions.ActionTypes.SLATE_REMOVED:
      var slates = [...state.selectedSlates];
      slates.splice(Number(action.payload) , 1);
      return Object.assign({}, state, {
        isSlatesLoading: false,
        selectedSlates: slates
      });

    default:
      return state;
  }
}

export function getSlates(state$: Observable<SlateState>) {
  return state$.select(state => state.slates);
}

export function getSelectedFaction(state$: Observable<SlateState>) {
  return state$.select(state => state.selectedFaction);
}

export function getIsSlatesLoading(state$: Observable<SlateState>) {
  return state$.select(state => state.isSlatesLoading);
}

export function getSelectedSlates(state$: Observable<SlateState>) {
  return state$.select(state => state.selectedSlates);
}

