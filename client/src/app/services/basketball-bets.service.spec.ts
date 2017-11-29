import { TestBed, inject } from '@angular/core/testing';

import { BasketballBetsService } from './basketball-bets.service';

describe('BasketballBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketballBetsService]
    });
  });

  it('should be created', inject([BasketballBetsService], (service: BasketballBetsService) => {
    expect(service).toBeTruthy();
  }));
});
