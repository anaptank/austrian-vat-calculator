import { CalculationResult, VatCalculator } from './vat-calculator';

export class VatCalculatorAustria implements VatCalculator {
  CalculateFromNetValue(rate: number, netValue: number): CalculationResult {
    const vatValue = netValue * rate;
    const grossValue = netValue + vatValue;
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
  CalculateFromVatValue(rate: number, vatValue: number): CalculationResult {
    const netValue = vatValue / rate;
    const grossValue = netValue + vatValue;
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
  CalculateFromGrossValue(rate: number, grossValue: number): CalculationResult {
    const netValue = grossValue / (1 + rate);
    const vatValue = grossValue - netValue;
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
}
