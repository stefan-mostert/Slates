import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlateMainComponent } from './slate-main.component';

describe('SlateMainComponent', () => {
  let component: SlateMainComponent;
  let fixture: ComponentFixture<SlateMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlateMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
