import { VatCalculatorAustria } from './vat-calculator-austria';

describe('VatCalculatorAustria', () => {
  let calculator: VatCalculatorAustria = new VatCalculatorAustria();
  let rateValue: number = 0.2;
  let grossValue: number = 120;
  let vatValue: number = 20;
  let netValue: number = 100;

  it('check GROSS and NET values when the VAT value was inserted', () => {
    const calculationResult = calculator.CalculateFromVatValue(
      rateValue,
      vatValue
    );
    expect(calculationResult.getNetValue).toBe(netValue);
    expect(calculationResult.getGrossValue).toBe(grossValue);
  });

  it('check GROSS and VAT values when the NET value was inserted', () => {
    const calculationResult = calculator.CalculateFromNetValue(
      rateValue,
      netValue
    );
    expect(calculationResult.getVatValue).toBe(vatValue);
    expect(calculationResult.getGrossValue).toBe(grossValue);
  });

  it('check VAT and NET values when the GROSS value was inserted', () => {
    const calculationResult = calculator.CalculateFromGrossValue(
      rateValue,
      grossValue
    );
    expect(calculationResult.getNetValue).toBe(netValue);
    expect(calculationResult.getVatValue).toBe(vatValue);
  });
});
