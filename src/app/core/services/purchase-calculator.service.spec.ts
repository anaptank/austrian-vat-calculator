import { TestBed } from '@angular/core/testing';

import { PurchaseCalculatorService } from './purchase-calculator.service';

describe('PurchaseCalculatorService', () => {
  let service: PurchaseCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
