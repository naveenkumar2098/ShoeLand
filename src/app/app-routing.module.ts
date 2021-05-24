import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { HelpComponent } from './components/help/help.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { ProductComponent } from './components/product/product.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  {path: '', component: StoreComponent},
  {path: 'store', component: StoreComponent},
  {path: 'help', component: HelpComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'cart', component:  CheckoutComponent},
  {path: 'order-placed', component: OrderPlacedComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
