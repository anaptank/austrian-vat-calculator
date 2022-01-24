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
    component.net?.setValue('0');

    expect(component.net?.hasError('min')).toBeTruthy();
  });

  it('should has net value input max validator', () => {
    component.net?.setValue('10000000000000');

    expect(component.net?.hasError('max')).toBeTruthy();
  });

  it('should has vat value input min validator', () => {
    component.vat?.setValue('0');

    expect(component.vat?.hasError('min')).toBeTruthy();
  });

  it('should has vat value input max validator', () => {
    component.vat?.setValue('10000000000000');

    expect(component.vat?.hasError('max')).toBeTruthy();
  });

  it('should has gross value input min validator', () => {
    component.gross?.setValue('0');

    expect(component.gross?.hasError('min')).toBeTruthy();
  });

  it('should has gross value input max validator', () => {
    component.gross?.setValue('10000000000000');

    expect(component.gross?.hasError('max')).toBeTruthy();
  });

  it('check if get() functions are working', () => {
    expect(component.gross).toBe(component.purchaseDataForm.get('gross'));
    expect(component.rate).toBe(component.purchaseDataForm.get('rate'));
    expect(component.vat).toBe(component.purchaseDataForm.get('vat'));
    expect(component.net).toBe(component.purchaseDataForm.get('net'));
  });

  it('when the value of one of the inputs is set to null the other inputs must also be null', () => {
    component.vat?.setValue(null);
    expect(component.net?.value).toBe(null);
    expect(component.gross?.value).toBe(null);

    component.net?.setValue(null);
    expect(component.vat?.value).toBe(null);
    expect(component.gross?.value).toBe(null);

    component.gross?.setValue(null);
    expect(component.net?.value).toBe(null);
    expect(component.vat?.value).toBe(null);
  });

  it('when the rate value changes the inputs must be null', () => {
    component.net?.setValue(100);
    component.vat?.setValue(20);
    component.gross?.setValue(120);
    component.rateValueSelection();
    expect(component.net?.value).toEqual(null);
    expect(component.vat?.value).toEqual(null);
    expect(component.gross?.value).toEqual(null);
  });
});
