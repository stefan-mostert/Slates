import { Slate, Weapon, Ability } from './../models/slate';
import { Action } from '@ngrx/store';

export namespace ActionTypes {
  export const SLATE_ADDED = '[Unit] Slate Added';
  export const SLATE_SELECTED = '[Unit] Slate Selected';
  export const SLATE_REMOVED = '[Unit] Slate Removed';
  export const SLATES_LOADING = '[Unit] Slate Loading';
  export const SLATES_LOADED = '[Unit] Slate Loaded';
  export const WEAPONS_LOADING = '[Unit] Weapon Loading';
  export const WEAPONS_LOADED = '[Unit] Weapon Loaded';
  export const ABILITIES_LOADING = '[Unit] Abilities Loading';
  export const ABILITIES_LOADED = '[Unit] Abilities Loaded';
};

export class SlateAdded implements Action {
  readonly type = ActionTypes.SLATE_ADDED;
  constructor(public payload: string) { }
}

export class SlateSelected implements Action {
  readonly type = ActionTypes.SLATE_SELECTED;
  constructor(public payload: string) { }
}

export class SlateRemoved implements Action {
  readonly type = ActionTypes.SLATE_REMOVED;
  constructor(public payload: number) { }
}

export class SlatesLoading implements Action {
  readonly type = ActionTypes.SLATES_LOADING;
  constructor(public payload: string) { }
}

export class SlatesLoaded implements Action {
  readonly type = ActionTypes.SLATES_LOADED;
  constructor(public payload: Slate[]) { }
}

export class WeaponsLoading implements Action {
  readonly type = ActionTypes.WEAPONS_LOADING;
  constructor(public payload: string) { }
}

export class WeaponsLoaded implements Action {
  readonly type = ActionTypes.WEAPONS_LOADED;
  constructor(public payload: Weapon[]) { }
}

export class AbilitiesLoading implements Action {
  readonly type = ActionTypes.ABILITIES_LOADING;
  constructor(public payload: string) { }
}

export class AbilitiesLoaded implements Action {
  readonly type = ActionTypes.ABILITIES_LOADED;
  constructor(public payload: Ability[]) { }
}

export type Actions
= SlateAdded
| SlateSelected
| SlateRemoved
| SlatesLoading
| SlatesLoaded
| WeaponsLoading
| WeaponsLoaded
| AbilitiesLoading
| AbilitiesLoaded;
