import {
  CalculationResult,
  VatCalculator,
} from '../shared/models/vat-calculator.model';
import { round } from 'mathjs';

export class VatCalculatorAustria implements VatCalculator {
  CalculateFromNetValue(rate: number, netValue: number): CalculationResult {
    const vatValue = round(netValue * rate, 2);
    const grossValue = round(netValue + vatValue, 2);
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
  CalculateFromVatValue(rate: number, vatValue: number): CalculationResult {
    const netValue = round(vatValue / rate, 2);
    const grossValue = round(netValue + vatValue, 2);
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
  CalculateFromGrossValue(rate: number, grossValue: number): CalculationResult {
    const netValue = round(grossValue / (1 + rate), 2);
    const vatValue = round(grossValue - netValue, 2);
    const result = new CalculationResult(netValue, vatValue, grossValue);
    return result;
  }
}
