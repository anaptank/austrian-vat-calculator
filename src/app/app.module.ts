import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VatCalculatorComponent } from './components/vat-calculator/vat-calculator.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogResetDataComponent } from './components/dialog-reset-data/dialog-reset-data.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    VatCalculatorComponent,
    DialogResetDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
