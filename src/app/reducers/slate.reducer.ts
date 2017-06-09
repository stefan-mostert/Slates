import { Slate } from './../models/slate';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as slateActions from './../actions/slate.actions';

export interface SlateState {
  isSlatesLoading: boolean;
  slates: Slate[];
  selectedSlate: Slate;
}

const initialState: SlateState = {
  isSlatesLoading: true,
  slates: [],
  selectedSlate: null
};

export function reducer(state = initialState, action: slateActions.Actions): SlateState {
  switch (action.type) {
    // case slate.ActionTypes.SLATE_ADDED:
    //   return Object.assign({}, state, {
    //     slates: [...state.slates, action.payload]
    //   });

    // case slate.ActionTypes.SLATE_REMOVED:
    //   const newSlates = state.slates.filter(s => s.name !== action.payload);
    //     return Object.assign({}, state, {
    //       slates: newSlates
    //     });

    case slateActions.ActionTypes.SLATES_LOADING:
        return Object.assign({}, state, {
          isSlatesLoading: true,
          slates: [],
          selectedSlate: null
        });

    case slateActions.ActionTypes.SLATES_LOADED:
        return Object.assign({}, state, {
          isSlatesLoading: false,
          slates: action.payload,
          selectedSlate: null
        });

    case slateActions.ActionTypes.SLATE_SELECTED:
        const foundSlate = state.slates.find(s => s.name === action.payload);
        return Object.assign({}, state, {
          selectedSlate: foundSlate
        });

    default:
      return state;
  }
}

export function getSlates(state$: Observable<SlateState>) {
  return state$.select(state => state.slates);
}

export function getIsSlatesLoading(state$: Observable<SlateState>) {
  return state$.select(state => state.isSlatesLoading);
}

export function getSelectedSlate(state$: Observable<SlateState>) {
  return state$.select(state => state.selectedSlate);
}

