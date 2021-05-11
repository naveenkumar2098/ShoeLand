import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/interfaces/cart';
import { Payment } from 'src/app/interfaces/payment';
import { Product } from 'src/app/interfaces/product';
import { Shipping } from 'src/app/interfaces/shipping';
import { CartService } from 'src/app/services/cart.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  step: number = 1;
  cartItems!: any;
  products: Product[] = [];
  shoppingCart: any = [];
  orderForm!: FormGroup;
  paymentMethods!: Payment[];
  paymentSelected: string = '1';
  shippingMethods!: Shipping[];
  shippingSelected: string = '2';
  shippingPrice: number = 0;
  coupon: string = 'BOOTCAMP2021';
  
  constructor(private cartService: CartService, private productsService: ProductsService, private formBuilder: FormBuilder, private shippingService: ShippingService, private paymentService: PaymentsService) { 
    this.cartService.items.subscribe(data => {
      console.log(data);
      this.cartItems = data;
    })
    this.productsService.listAll().subscribe((data: Product[]): void => {
      this.products = data;
      for(let i = 0, l = this.products.length; i<l; i++){
        for(let j = 0, m = this.cartItems.length; j<m; j++) {
          if(this.products[i].id === this.cartItems[j].productId){
            this.shoppingCart.push({ 'product': this.products[i], 'quantity': this.cartItems[j].quantity });
          }
        }
      }
      console.log(this.shoppingCart)
    })
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.minLength(2)],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      addressOpt: [''],
      country: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      phone: ['', Validators.required],
      couponCode: [''],
      paymentMethod: ['', Validators.required],
      shippingMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  updateQuantity(quantity: number, productId: number) {
    this.cartService.addToCart(productId, quantity, true);
  }

  getShippingPrice() {
    this.shippingService.listOne(parseInt(this.shippingSelected)).subscribe(data => this.shippingPrice = data.price);
  }

  calculatePrice(id: number): number {
    let price = 0;
    this.shoppingCart.forEach((el: any): number => el.product.id === id ? price = (el.product.price * el.quantity) : price);
    return price;
  }

  calculateTotal(): number {
    let total = 0;
    for(let i = 0, l = this.shoppingCart.length; i<l; i++) {
      total += this.shoppingCart[i].product.price * this.shoppingCart[i].quantity;
    }
    return total + this.shippingPrice;
  }

  removeFromStock() {
    this.shoppingCart.forEach((el: { product: { id: number; }; quantity: number; }) => this.cartService.updateStock(el.product.id, el.quantity));
  }

  get firstName() {
    return this.orderForm.controls.firstName;
  }

  get lastName() {
    return this.orderForm.controls.lastName;
  }

  get address() {
    return this.orderForm.controls.address;
  }

  get addressOpt() {
    return this.orderForm.controls.addressOpt;
  }

  get country() {
    return this.orderForm.controls.country;
  }

  get city() {
    return this.orderForm.controls.city;
  }

  get pinCode() {
    return this.orderForm.controls.pinCode;
  }

  get phone() {
    return this.orderForm.controls.phone;
  }

  get couponCode() {
    return this.orderForm.controls.couponCode;
  }

  get paymentMethod() {
    return this.orderForm.controls.paymentMethod;
  }

  get shippingMethod() {
    return this.orderForm.controls.shippingMethod;
  }
}
