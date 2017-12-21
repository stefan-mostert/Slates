import { SlateEffects } from './effects/slate.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SlateService } from './services/slate.service';
import { WeaponService } from './services/weapon.service';
import { AbilityService } from './services/ability.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { SlateListComponent } from './components/slate-list/slate-list.component';
import { SlateContainerComponent } from './components/slate-container/slate-container.component';
import { SlateMainComponent } from './components/slate-main/slate-main.component';

import { reducer } from './reducers';
import { EffectsModule } from "@ngrx/effects";
import {DropdownModule, DialogModule, CheckboxModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    SlateListComponent,
    SlateContainerComponent,
    SlateMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    DialogModule,
    CheckboxModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(SlateEffects),
  ],
  providers: [
    SlateService,
    WeaponService,
    AbilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
