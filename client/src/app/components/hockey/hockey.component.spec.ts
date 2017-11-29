import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyComponent } from './hockey.component';

describe('HockeyComponent', () => {
  let component: HockeyComponent;
  let fixture: ComponentFixture<HockeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HockeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HockeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
