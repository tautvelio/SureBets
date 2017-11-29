import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballComponent } from './football.component';

describe('DashboardComponent', () => {
  let component: FootballComponent;
  let fixture: ComponentFixture<FootballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
