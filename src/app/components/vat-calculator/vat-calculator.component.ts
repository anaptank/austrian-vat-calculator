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
import { DialogResetDataComponent } from '../dialog-reset-data/dialog-reset-data.component';
import { MatDialog } from '@angular/material/dialog';

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
    { value: 0.2, viewValue: '20% (standard)' },
    { value: 0.13, viewValue: '13% (reduced)' },
    { value: 0.1, viewValue: '10% (reduced)' },
  ];

  public purchaseDataForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {
    this.initializeForm();
    this.vatCalculator = new VatCalculatorAustria();
  }

  initializeForm(): void {
    this.purchaseDataForm = this.fb.group({
      rate: this.rates[0].value,
      gross: [undefined, [Validators.min(0.01)]],
      vat: [undefined, Validators.min(0.01)],
      net: [undefined, Validators.min(0.01)],
    });
  }

  ngOnInit() {}

  getFormFieldValue(control: string) {
    return this.purchaseDataForm.get(control)?.value;
  }

  rateValueSelection() {
    const dialogRef = this.dialog.open(DialogResetDataComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetFormData();
      }
    });
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

  resetFormData(): void {
    let keys = Object.keys(this.purchaseDataForm.value);
    keys
      .filter((key) => key != 'rate')
      .forEach((res) => this.purchaseDataForm.get(res)?.reset());
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
