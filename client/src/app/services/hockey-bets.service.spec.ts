import { TestBed, inject } from '@angular/core/testing';

import { HockeyBetsService } from './hockey-bets.service';

describe('HockeyBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HockeyBetsService]
    });
  });

  it('should be created', inject([HockeyBetsService], (service: HockeyBetsService) => {
    expect(service).toBeTruthy();
  }));
});
