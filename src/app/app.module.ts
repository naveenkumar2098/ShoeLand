import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { StoreComponent } from './components/store/store.component';
import { HelpComponent } from './components/help/help.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    FooterComponent,
    SearchComponent,
    StoreComponent,
    HelpComponent,
    ProductComponent,
    ProductsComponent,
    ErrorComponent,
    CheckoutComponent,
    OrderPlacedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
