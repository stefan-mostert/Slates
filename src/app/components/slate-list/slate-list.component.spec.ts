import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlateListComponent } from './slate-list.component';

describe('SlateListComponent', () => {
  let component: SlateListComponent;
  let fixture: ComponentFixture<SlateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
