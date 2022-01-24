import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VatCalculatorComponent } from './components/vat-calculator/vat-calculator.component';

export const routes: Routes = [
  { path: 'vat-calculator', component: VatCalculatorComponent },
  { path: '**', redirectTo: '/vat-calculator' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
