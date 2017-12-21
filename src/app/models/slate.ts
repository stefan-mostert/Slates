export class Slate {
    id: string;
    name: string;
    role: BattleFieldRole;
    powerRating: number;
    profiles: Profile[];
    unitComp: string;
    wargear: Wargear;
    abilities: Ability[];
    weaponAbilities: Ability[];
    weapons: Weapon[];
    psyker: string;
    factionKeywords: string[];
    keywords: string[];
}

export enum BattleFieldRole {
    HQ,
    Troop,
    FastAttack,
    Elite,
    HeavySupport,
    DedicatedTransport,
    Flyer,
    Fortification,
    LordOfWar
}

export interface Profile {
    name: string;
    move: string;
    weaponSkill: string;
    ballisticSkill: string;
    strength: string;
    thoughness: string;
    wounds: string;
    attacks: string;
    leadership: string;
    save: string;
}

export interface Wargear {
    wargearText: string[];
    wargearOptions: WargearOption[];
}

export interface WargearOption {
    name: string;
    equipedByDefault: boolean;
}

export interface Ability {
    name: string;
    lookup: boolean;
    detail: string;
    compact: string;
    displayFullText: boolean;
}

export interface Weapon {
    name: string;
    multiProfileComment: string;
    profiles: WeaponProfile[];
    equiped: boolean;
}

export interface WeaponProfile {
    name: string;
    range: string;
    type: string;
    strength: string;
    ap: string;
    damage: string;
    abilities: string;
    abilityNumber: number;
}
