import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResetDataComponent } from './dialog-reset-data.component';

describe('DialogResetDataComponent', () => {
  let component: DialogResetDataComponent;
  let fixture: ComponentFixture<DialogResetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResetDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DialogResetDataComponent', () => {
    expect(component).toBeTruthy();
  });
});
