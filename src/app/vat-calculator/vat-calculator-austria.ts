import { CalculationResult, VatCalculator } from './vat-calculator';
import { round } from 'mathjs';

export class VatCalculatorAustria implements VatCalculator {
  CalculateFromNetValue(rate: number, netValue: number): CalculationResult {
    const vatValue = round(netValue * rate);
    const grossValue = round(netValue + vatValue);
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
  CalculateFromVatValue(rate: number, vatValue: number): CalculationResult {
    const netValue = round(vatValue / rate);
    const grossValue = round(netValue + vatValue);
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
  CalculateFromGrossValue(rate: number, grossValue: number): CalculationResult {
    const netValue = round(grossValue / (1 + rate));
    const vatValue = round(grossValue - netValue);
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
}
