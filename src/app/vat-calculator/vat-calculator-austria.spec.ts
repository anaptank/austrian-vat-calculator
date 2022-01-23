import { VatCalculatorAustria } from './vat-calculator-austria';

describe('VatCalculatorAustria', () => {
  let calculator: VatCalculatorAustria = new VatCalculatorAustria();

  it('check GROSS and NET values when the VAT value was inserted', () => {
    const rateValue: number = 0.2;
    const grossValue: number = 133.02;
    const vatValue: number = 22.17;
    const netValue: number = 110.85;

    const calculationResult = calculator.CalculateFromVatValue(
      rateValue,
      vatValue
    );
    expect(calculationResult.getNetValue).toBe(netValue);
    expect(calculationResult.getGrossValue).toBe(grossValue);
  });

  it('check GROSS and VAT values when the NET value was inserted', () => {
    const rateValue: number = 0.2;
    const grossValue: number = 133;
    const vatValue: number = 22.17;
    const netValue: number = 110.83;

    const calculationResult = calculator.CalculateFromNetValue(
      rateValue,
      netValue
    );
    expect(calculationResult.getVatValue).toBe(vatValue);
    expect(calculationResult.getGrossValue).toBe(grossValue);
  });

  it('check VAT and NET values when the GROSS value was inserted', () => {
    const rateValue: number = 0.2;
    const grossValue: number = 133;
    const vatValue: number = 22.17;
    const netValue: number = 110.83;

    const calculationResult = calculator.CalculateFromGrossValue(
      rateValue,
      grossValue
    );
    expect(calculationResult.getNetValue).toBe(netValue);
    expect(calculationResult.getVatValue).toBe(vatValue);
  });
});
