import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public rates: VatRate[] = [
    { value: 0.2, viewValue: '20% (standard)' },
    { value: 0.13, viewValue: '13% (reduced)' },
    { value: 0.1, viewValue: '10% (reduced)' },
  ];

  public purchaseDataForm: FormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.purchaseDataForm = this.fb.group({
      rate: this.rates[0].value,
      gross: undefined, // Put validators
      vat: undefined, // Put validators
      net: undefined, // Put validators
    });
  }

  ngOnInit() {}

  getFormFieldValue(control: string) {
    return this.purchaseDataForm.get(control)?.value;
  }

  parseFormFieldValueToFloat(control: string) {
    return parseFloat(this.purchaseDataForm.get(control)?.value);
  }

  grossValueSelection() {
    this.renderer.listen(this.grossElRef.nativeElement, 'keyup', () => {
      if (this.getFormFieldValue('gross') != '') {
        this.purchaseDataForm
          .get('net')
          ?.setValue(
            this.parseFormFieldValueToFloat('gross') /
              (1 + this.parseFormFieldValueToFloat('rate'))
          );
        this.purchaseDataForm
          .get('vat')
          ?.setValue(
            this.parseFormFieldValueToFloat('gross') -
              this.parseFormFieldValueToFloat('net')
          );
      } else {
        this.purchaseDataForm.get('net')?.setValue('');
        this.purchaseDataForm.get('vat')?.setValue('');
      }
    });
  }

  netValueSelection() {
    this.renderer.listen(this.netElRef.nativeElement, 'keyup', () => {
      let vatValue =
        this.parseFormFieldValueToFloat('net') *
        this.parseFormFieldValueToFloat('rate');
      if (this.getFormFieldValue('net') != '') {
        this.purchaseDataForm.get('vat')?.setValue(vatValue);
        this.purchaseDataForm
          .get('gross')
          ?.setValue(this.parseFormFieldValueToFloat('net') + vatValue);
      } else {
        this.purchaseDataForm.get('vat')?.setValue('');
        this.purchaseDataForm.get('gross')?.setValue('');
      }
    });
  }

  vatValueSelection() {
    this.renderer.listen(this.vatElRef.nativeElement, 'keyup', () => {
      if (this.getFormFieldValue('vat') != '') {
        this.purchaseDataForm
          .get('net')
          ?.setValue(
            this.parseFormFieldValueToFloat('vat') /
              this.parseFormFieldValueToFloat('rate')
          );
        this.purchaseDataForm
          .get('gross')
          ?.setValue(
            this.parseFormFieldValueToFloat('net') +
              this.parseFormFieldValueToFloat('vat')
          );
      } else {
        this.purchaseDataForm.get('net')?.setValue('');
        this.purchaseDataForm.get('gross')?.setValue('');
      }
    });
  }

  clearButton(): void {
    let keys = Object.keys(this.purchaseDataForm.value);
    keys
      .filter((key) => key != 'rate')
      .forEach((res) => this.purchaseDataForm.get(res)?.setValue(undefined));
  }
}
