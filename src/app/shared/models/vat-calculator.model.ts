export interface VatCalculator {
  CalculateFromNetValue(rate: number, netValue: number): CalculationResult;
  CalculateFromVatValue(rate: number, vatValue: number): CalculationResult;
  CalculateFromGrossValue(rate: number, grossValue: number): CalculationResult;
}

export class CalculationResult {
  private netValue: number;
  private vatValue: number;
  private grossValue: number;

  constructor(netValue: number, vatValue: number, grossValue: number) {
    this.netValue = netValue;
    this.vatValue = vatValue;
    this.grossValue = grossValue;
  }

  public get getNetValue(): number {
    return this.netValue;
  }

  public get getVatValue(): number {
    return this.vatValue;
  }

  public get getGrossValue(): number {
    return this.grossValue;
  }
}
