import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VatCalculator } from 'src/app/vat-calculator/vat-calculator';
import { VatCalculatorAustria } from 'src/app/vat-calculator/vat-calculator-austria';

interface VatRate {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-vat-calculator',
  templateUrl: './vat-calculator.component.html',
  styleUrls: ['./vat-calculator.component.scss'],
})
export class VatCalculatorComponent implements OnInit {
  @ViewChild('rate') rateElRef: ElementRef;
  @ViewChild('gross') grossElRef: ElementRef;
  @ViewChild('vat') vatElRef: ElementRef;
  @ViewChild('net') netElRef: ElementRef;

  private vatCalculator: VatCalculator;

  public rates: VatRate[] = [
    { value: 0.2, viewValue: '20% (standard)' },
    { value: 0.13, viewValue: '13% (reduced)' },
    { value: 0.1, viewValue: '10% (reduced)' },
  ];

  public purchaseDataForm: FormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.initializeForm();
    this.vatCalculator = new VatCalculatorAustria();
  }

  initializeForm(): void {
    this.purchaseDataForm = this.fb.group({
      rate: this.rates[0].value,
      gross: [undefined, Validators.pattern('^[1-9]+[0-9]*$')],
      vat: [undefined, Validators.pattern('^[1-9]+[0-9]*$')],
      net: [undefined, Validators.pattern('^[1-9]+[0-9]*$')],
    });
  }

  ngOnInit() {}

  getFormFieldValue(control: string) {
    return this.purchaseDataForm.get(control)?.value;
  }

  grossValueSelection() {
    this.renderer.listen(this.grossElRef.nativeElement, 'keyup', () => {
      if (!this.getFormFieldValue('gross')) {
        this.purchaseDataForm.get('net')?.reset();
        this.purchaseDataForm.get('vat')?.reset();
        return;
      }
      const calculationResult = this.vatCalculator.CalculateFromGrossValue(
        this.getFormFieldValue('rate'),
        this.getFormFieldValue('gross')
      );
      this.purchaseDataForm.get('net')?.setValue(calculationResult.getNetValue);
      this.purchaseDataForm.get('vat')?.setValue(calculationResult.getVatValue);
    });
  }

  netValueSelection() {
    this.renderer.listen(this.netElRef.nativeElement, 'keyup', () => {
      if (!this.getFormFieldValue('net')) {
        this.purchaseDataForm.get('vat')?.reset();
        this.purchaseDataForm.get('gross')?.reset();
        return;
      }
      const calculationResult = this.vatCalculator.CalculateFromNetValue(
        this.getFormFieldValue('rate'),
        this.getFormFieldValue('net')
      );

      this.purchaseDataForm.get('vat')?.setValue(calculationResult.getVatValue);
      this.purchaseDataForm
        .get('gross')
        ?.setValue(calculationResult.getGrossValue);
    });
  }

  vatValueSelection() {
    this.renderer.listen(this.vatElRef.nativeElement, 'keyup', () => {
      if (!this.getFormFieldValue('vat')) {
        this.purchaseDataForm.get('net')?.reset('');
        this.purchaseDataForm.get('gross')?.reset('');
      }

      const calculationResult = this.vatCalculator.CalculateFromVatValue(
        this.getFormFieldValue('rate'),
        this.getFormFieldValue('vat')
      );

      this.purchaseDataForm.get('net')?.setValue(calculationResult.getNetValue);
      this.purchaseDataForm
        .get('gross')
        ?.setValue(calculationResult.getGrossValue);
    });
  }

  clearButton(): void {
    let keys = Object.keys(this.purchaseDataForm.value);
    keys
      .filter((key) => key != 'rate')
      .forEach((res) => this.purchaseDataForm.get(res)?.reset());
  }
}
