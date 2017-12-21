import { SlateRemoved } from './../../actions/slate.actions';
import { Slate } from './../../models/slate';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slate-main',
  templateUrl: './slate-main.component.html',
  styleUrls: ['./slate-main.component.scss']
})
export class SlateMainComponent implements OnInit {

  @Input() slate: Slate;
  @Input() slateId: number;
  @Output() closed = new EventEmitter<number>();

  isDoubleDigits = false;
  displayWeaponOptions = false;
  displayAbilityOptions = false;
  selectedValues: string[] = [];
  selectedAbilities: string[] = [];
  wounds: number[];

  constructor() { }

  ngOnInit() {
    this.selectedValues = this.filterEquipedWeapons().map(weapon => weapon.name);
    this.selectedAbilities = this.filterFullTextAbilities().map(ability => ability.name);
    this.wounds = Array(Number(this.slate.profiles[0].wounds)).fill(0); 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slate'] && this.slate) {
      this.isDoubleDigits = this.slate.powerRating > 9;
    }
  }

  closeClicked() {
    this.closed.emit(this.slateId);
  }

  showWeaponOptions() {
    this.displayWeaponOptions = true;
  }

  showAbilityOptions() {
    this.displayAbilityOptions = true;
  }

  saveWeaponOptions() {
    this.slate.weaponAbilities = [];
    let abilityCount = 1;
    this.slate.weapons.forEach(weapon => {
      if (this.selectedValues.indexOf(weapon.name) > -1) {
        weapon.equiped = true;
        weapon.profiles.forEach(profile => {
          if (profile.abilities.length > 0
              && weapon.equiped
              && profile.abilities !== '*flamer'
              && profile.abilities !== '*grav'
              && profile.abilities !== '*melta'
              && profile.abilities !== '*plasma'
              && profile.abilities !== '+1 attack'
              && profile.abilities !== '-1 to Hit') {
            this.slate.weaponAbilities.push(
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
      } else {
        weapon.equiped = false;
      }
    });
    this.displayWeaponOptions = false;
  }

  saveAbilityOptions() {
    this.slate.abilities.forEach(ability => {
      if (this.selectedAbilities.indexOf(ability.name) > -1) {
        ability.displayFullText = true;
      } else {
        ability.displayFullText = false;
      }
    })
    this.displayAbilityOptions = false;
  }

  filterEquipedWeapons() {
    return this.slate.weapons.filter(weapon => weapon.equiped);
  }

  filterFullTextAbilities() {
    return this.slate.abilities.filter(ability => ability.displayFullText);
  }
}
