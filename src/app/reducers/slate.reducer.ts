import { Slate, Weapon, Ability } from './../models/slate';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as slateActions from './../actions/slate.actions';

export interface SlateState {
  isSlatesLoading: boolean;
  isWeaponsLoading: boolean;
  isAbilitiesLoading: boolean;
  selectedFaction: string;
  slates: Slate[];
  weapons: Weapon[];
  abilities: Ability[];
  selectedSlates: Slate[];
}

const initialState: SlateState = {
  isSlatesLoading: true,
  isWeaponsLoading: true,
  isAbilitiesLoading: true,
  selectedFaction: '',
  slates: [],
  weapons: [],
  abilities: [],
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

    case slateActions.ActionTypes.ABILITIES_LOADING: {
      return Object.assign({}, state, {
        isAbilitiesLoading: true,
        abilities: [],
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

    case slateActions.ActionTypes.ABILITIES_LOADED: {
      return Object.assign({}, state, {
        isAbilitiesLoading: false,
        abilities: action.payload,
      });
    }

    case slateActions.ActionTypes.SLATE_SELECTED: {
      const foundSlate = state.slates.find(s => s.id === action.payload);

      let abilityCount = 1;
      foundSlate.weapons = [];
      foundSlate.weaponAbilities = [];

      // set weapons
      foundSlate.wargear.wargearOptions.forEach(wgo => {
        const weapon = state.weapons.find(w => w.name === wgo.name);
        if (weapon) {
          weapon.equiped = wgo.equipedByDefault;
          weapon.profiles.forEach(profile => {
            if (profile.abilities.length > 0
                && weapon.equiped
                && profile.abilities !== '*flamer'
                && profile.abilities !== '*grav'
                && profile.abilities !== '*melta'
                && profile.abilities !== '*plasma'
                && profile.abilities !== '+1 attack'
                && profile.abilities !== '-1 to Hit') {
              foundSlate.weaponAbilities.push(
                {
                  name: '*' + abilityCount,
                  lookup: false,
                  detail: profile.abilities,
                  compact: '(see codex)',
                  displayFullText: true
                });
              profile.abilityNumber = abilityCount;
              abilityCount++;
            }
          });
          foundSlate.weapons.push(weapon);
        };
      });

      // set abilities
      foundSlate.abilities.forEach(ability => {
        if (ability.lookup) {
          const foundAbility = state.abilities.find(a => a.name === ability.name);
          if (foundAbility) {
            ability.detail = foundAbility.detail;
            ability.compact = foundAbility.compact;
          } else {
            ability.detail = '(see codex)';
            ability.compact = '(see codex)';
          }
        }
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

export function getAbilities(state$: Observable<SlateState>) {
  return state$.select(state => state.abilities);
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

export function getIsAbilitiesLoading(state$: Observable<SlateState>) {
  return state$.select(state => state.isAbilitiesLoading);
}

export function getSelectedSlates(state$: Observable<SlateState>) {
  return state$.select(state => state.selectedSlates);
}

