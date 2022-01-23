import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { VatCalculatorComponent } from './vat-calculator.component';

describe('VatCalculatorComponent', () => {
  let component: VatCalculatorComponent;
  let fixture: ComponentFixture<VatCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [VatCalculatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('check initial form values for form group', () => {
    const purchaseDataForm = component.purchaseDataForm;
    const purchaseFormValues = {
      rate: 0.2,
      gross: null,
      vat: null,
      net: null,
    };

    expect(purchaseDataForm.value).toEqual(purchaseFormValues);
  });

  it('should has net value input min validator', () => {
    const netFormControl = component.purchaseDataForm.get('net');
    netFormControl?.setValue('0');

    expect(netFormControl?.hasError('min')).toBeTruthy();
  });

  it('should has net value input max validator', () => {
    const netFormControl = component.purchaseDataForm.get('net');
    netFormControl?.setValue('10000000000000');

    expect(netFormControl?.hasError('max')).toBeTruthy();
  });

  it('should has vat value input min validator', () => {
    const vatFormControl = component.purchaseDataForm.get('vat');
    vatFormControl?.setValue('0');

    expect(vatFormControl?.hasError('min')).toBeTruthy();
  });

  it('should has vat value input max validator', () => {
    const vatFormControl = component.purchaseDataForm.get('vat');
    vatFormControl?.setValue('10000000000000');

    expect(vatFormControl?.hasError('max')).toBeTruthy();
  });

  it('should has gross value input min validator', () => {
    const grossFormControl = component.purchaseDataForm.get('gross');
    grossFormControl?.setValue('0');

    expect(grossFormControl?.hasError('min')).toBeTruthy();
  });

  it('should has gross value input max validator', () => {
    const grossFormControl = component.purchaseDataForm.get('gross');
    grossFormControl?.setValue('10000000000000');

    expect(grossFormControl?.hasError('max')).toBeTruthy();
  });

  it('check if get() functions are working', () => {
    expect(component.gross).toBe(component.purchaseDataForm.get('gross'));
    expect(component.rate).toBe(component.purchaseDataForm.get('rate'));
    expect(component.vat).toBe(component.purchaseDataForm.get('vat'));
    expect(component.net).toBe(component.purchaseDataForm.get('net'));
  });
});
