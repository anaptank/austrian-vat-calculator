import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VatCalculator } from 'src/app/shared/models/vat-calculator.model';
import { VatCalculatorAustria } from 'src/app/core/vat-calculator-austria';

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
  @ViewChild('rateSelection') rateElRef: ElementRef;
  @ViewChild('grossInput') grossElRef: ElementRef;
  @ViewChild('vatInput') vatElRef: ElementRef;
  @ViewChild('netInput') netElRef: ElementRef;

  private vatCalculator: VatCalculator;

  public rates: VatRate[] = [
    { value: 0.2, viewValue: '20%' },
    { value: 0.13, viewValue: '13%' },
    { value: 0.1, viewValue: '10%' },
  ];

  public purchaseDataForm: FormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.initializeForm();
    this.vatCalculator = new VatCalculatorAustria();
  }

  initializeForm(): void {
    this.purchaseDataForm = this.fb.group({
      rate: this.rates[0].value,
      gross: [null, [Validators.min(0.01), Validators.max(1000000000000)]],
      vat: [null, [Validators.min(0.01), Validators.max(1000000000000)]],
      net: [null, [Validators.min(0.01), Validators.max(1000000000000)]],
    });
  }

  ngOnInit() {}

  rateValueSelection() {
    this.resetFormData();
  }

  grossValueSelection() {
    this.renderer.listen(this.grossElRef.nativeElement, 'keyup', () => {
      if (!this.gross?.value) {
        this.purchaseDataForm.get('net')?.reset();
        this.purchaseDataForm.get('vat')?.reset();
        return;
      }
      const calculationResult = this.vatCalculator.CalculateFromGrossValue(
        this.rate?.value,
        this.gross?.value
      );
      this.purchaseDataForm.get('net')?.setValue(calculationResult.getNetValue);
      this.purchaseDataForm.get('vat')?.setValue(calculationResult.getVatValue);
    });
  }

  netValueSelection() {
    this.renderer.listen(this.netElRef.nativeElement, 'keyup', () => {
      if (!this.net?.value) {
        this.purchaseDataForm.get('vat')?.reset();
        this.purchaseDataForm.get('gross')?.reset();
        return;
      }
      const calculationResult = this.vatCalculator.CalculateFromNetValue(
        this.rate?.value,
        this.net?.value
      );

      this.purchaseDataForm.get('vat')?.setValue(calculationResult.getVatValue);
      this.purchaseDataForm
        .get('gross')
        ?.setValue(calculationResult.getGrossValue);
    });
  }

  vatValueSelection() {
    this.renderer.listen(this.vatElRef.nativeElement, 'keyup', () => {
      if (!this.vat?.value) {
        this.purchaseDataForm.get('net')?.reset('');
        this.purchaseDataForm.get('gross')?.reset('');
      }

      const calculationResult = this.vatCalculator.CalculateFromVatValue(
        this.rate?.value,
        this.vat?.value
      );

      this.purchaseDataForm.get('net')?.setValue(calculationResult.getNetValue);
      this.purchaseDataForm
        .get('gross')
        ?.setValue(calculationResult.getGrossValue);
    });
  }

  resetFormData(): void {
    let keys = Object.keys(this.purchaseDataForm.value);
    keys
      .filter((key) => key != 'rate')
      .forEach((res) => this.purchaseDataForm.get(res)?.reset());
  }

  get rate() {
    return this.purchaseDataForm.get('rate');
  }

  get gross() {
    return this.purchaseDataForm.get('gross');
  }

  get net() {
    return this.purchaseDataForm.get('net');
  }

  get vat() {
    return this.purchaseDataForm.get('vat');
  }
}
