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
  selectedValues: string[] = [];

  constructor() { }

  ngOnInit() {
    this.selectedValues = this.filterEquipedWeapons().map(weapon => weapon.name);
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

  saveWeaponOptions() {
    this.slate.weaponAbilities = [];
    let abilityCount = 1;
    this.slate.weapons.forEach(weapon => {
      if (this.selectedValues.indexOf(weapon.name) > -1) {
        weapon.equiped = true;
        weapon.profiles.forEach(profile => {
          if (profile.abilities.length > 0) {
            this.slate.weaponAbilities.push(
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
      } else {
        weapon.equiped = false;
      }
    });
    console.warn(this.slate.weapons);

    this.displayWeaponOptions = false;
  }

  filterEquipedWeapons() {
    return this.slate.weapons.filter(weapon => weapon.equiped);
  }
}
