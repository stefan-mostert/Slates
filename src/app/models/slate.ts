export class Slate {
    name: string;
    role: BattleFieldRole;
    powerRating: number;
    profiles: Profile[];
    unitComp: string;
    wargear: string[];
    abilities: Ability[];
    weapons: Weapon[];
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
    title: string;
}

export interface Ability {
    name: string;
    detail: string;
}

export interface Weapon {
    name: string;
    multiProfileComment: string;
    profiles: WeaponProfile[];
}

export interface WeaponProfile {
    name: string;
    range: string;
    type: string;
    strength: string;
    ap: string;
    damage: string;
    abilities: string;
}
