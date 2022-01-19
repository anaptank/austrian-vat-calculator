import { TestBed } from '@angular/core/testing';

import { VatCalculatorService } from './vat-calculator.service';

describe('vatCalculatorService', () => {
  let service: VatCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
