import { Slate, Weapon, Ability } from './../models/slate';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as slateActions from './../actions/slate.actions';

export interface SlateState {
  isSlatesLoading: boolean;
  isWeaponsLoading: boolean;
  selectedFaction: string;
  slates: Slate[];
  weapons: Weapon[];
  selectedSlates: Slate[];
}

const initialState: SlateState = {
  isSlatesLoading: true,
  isWeaponsLoading: true,
  selectedFaction: '',
  slates: [],
  weapons: [],
  selectedSlates: []
};

export function reducer(state = initialState, action: slateActions.Actions): SlateState {
  switch (action.type) {

    case slateActions.ActionTypes.SLATES_LOADING: {
      return Object.assign({}, state, {
        isSlatesLoading: true,
        selectedFaction: action.payload,
        slates: [],
        selectedSlates: []
      });
    }

    case slateActions.ActionTypes.WEAPONS_LOADING: {
      return Object.assign({}, state, {
        isWeaponsLoading: true,
        weapons: [],
      });
    }

    case slateActions.ActionTypes.SLATES_LOADED: {
      return Object.assign({}, state, {
        isSlatesLoading: false,
        slates: action.payload,
        selectedSlates: []
      });
    }

    case slateActions.ActionTypes.WEAPONS_LOADED: {
      return Object.assign({}, state, {
        isWeaponsLoading: false,
        weapons: action.payload,
      });
    }

    case slateActions.ActionTypes.SLATE_SELECTED: {
      const foundSlate = state.slates.find(s => s.name === action.payload);

      let abilityCount = 1;
      foundSlate.weapons = [];
      foundSlate.wargear.wargearOptions.forEach(wgo => {
        const weapon = state.weapons.find(w => w.name === wgo.name);
        if (weapon) {
          weapon.equiped = wgo.equipedByDefault;
          weapon.profiles.forEach(profile => {
            if (profile.abilities.length > 0) {
              foundSlate.weaponAbilities.push(
                {
                  name: '*' + abilityCount,
                  lookup: false,
                  detail: profile.abilities,
                  displayFullText: true
                });
              profile.abilityNumber = abilityCount;
              abilityCount++;
            }
          });
          foundSlate.weapons.push(weapon);
        };
      });

      return Object.assign({}, state, {
        isSlatesLoading: false,
        selectedSlates: [...state.selectedSlates, foundSlate]
      });
    }

    case slateActions.ActionTypes.SLATE_REMOVED: {
      const slates = [...state.selectedSlates];
      slates.splice(Number(action.payload) , 1);

      return Object.assign({}, state, {
        isSlatesLoading: false,
        selectedSlates: slates
      });
    }

    default:
      return state;
  }
}

export function getSlates(state$: Observable<SlateState>) {
  return state$.select(state => state.slates);

}
export function getWeapons(state$: Observable<SlateState>) {
  return state$.select(state => state.weapons);
}

export function getSelectedFaction(state$: Observable<SlateState>) {
  return state$.select(state => state.selectedFaction);
}

export function getIsSlatesLoading(state$: Observable<SlateState>) {
  return state$.select(state => state.isSlatesLoading);
}

export function getIsWeaponsLoading(state$: Observable<SlateState>) {
  return state$.select(state => state.isWeaponsLoading);
}

export function getSelectedSlates(state$: Observable<SlateState>) {
  return state$.select(state => state.selectedSlates);
}

