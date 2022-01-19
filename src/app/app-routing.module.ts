import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VatCalculatorComponent } from './components/purchase-calculator/vat-calculator.component';

const routes: Routes = [
  { path: 'vat-calculator', component: VatCalculatorComponent },
  { path: '', redirectTo: '/vat-calculator', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
