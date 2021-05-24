import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Order } from 'src/app/interfaces/order';
import { OrderProduct } from 'src/app/interfaces/order-product';
import { Payment } from 'src/app/interfaces/payment';
import { Product } from 'src/app/interfaces/product';
import { Shipping } from 'src/app/interfaces/shipping';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
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
  coupon!: string;
  orderProducts: OrderProduct[] = [];
  order: Order = {
    'id': Math.floor(Math.random()*100),
    'date': new Date(),
    'orderProducts': [],
    'firstName': null,
    'lastName': null,
    'address': null,
    'country': null,
    'city': null,
    'pinCode': null,
    'phone': null,
    'paymentId': null,
    'shippingId': null,
    'state': null,
    'totalPrice': null
  }
  
  constructor(private cartService: CartService, private productsService: ProductsService, private formBuilder: FormBuilder, private shippingService: ShippingService, private paymentService: PaymentsService, private ele: ElementRef, private router: Router, private ordersService: OrdersService) { 
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
      paymentMethod: [this.paymentSelected, Validators.required],
      shippingMethod: [this.shippingSelected, Validators.required]
    });
  }

  ngOnInit(): void {
    this.paymentService.listAll().subscribe(data => this.paymentMethods = data);
    this.shippingService.listAll().subscribe(data => this.shippingMethods = data);
  }

  submit(){
    if((this.orderForm.controls.firstName.invalid ||
       this.orderForm.controls.lastName.invalid ||
       this.orderForm.controls.address.invalid ||
       this.orderForm.controls.country.invalid ||
       this.orderForm.controls.city.invalid ||
       this.orderForm.controls.pinCode.invalid ||
       this.orderForm.controls.phone.invalid || 
       this.orderForm.controls.shippingMethod.invalid) && this.step == 2){
      return;
    }
    this.step += 1;
    console.log(this.step)
    if(this.step == 4){
      this.confirmOrder();
      this.router.navigate(['/order-placed'])
    }
  }

  previous() {
    this.step -= 1;
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
    if(this.coupon === 'BOOTCAMP2021'){
      let discount = (total + this.shippingPrice) * 0.1;
      return (total + this.shippingPrice) - discount;
    } else
      return total + this.shippingPrice;
  }

  calculateSubTotal(): number {
    let subTotal = 0;
    for(let i = 0, l = this.shoppingCart.length; i<l; i++) {
      subTotal += this.shoppingCart[i].product.price * this.shoppingCart[i].quantity;
    }
    return subTotal;
  }

  makeProductsList() {
    this.shoppingCart.forEach((el: { product: { id: any; price: number; }; quantity: number; }) => {
      let orderProduct: OrderProduct;
      orderProduct = {
        'productId': el.product.id,
        'quantity': el.quantity,
        'unitPrice': el.product.price,
        'subTotal': (el.quantity * el.product.price)
      };
      this.orderProducts.push(orderProduct);
    });
  }

  makeOrder(): Order {
    this.order.date = new Date();
    this.order.orderProducts = this.orderProducts;
    this.order.firstName = this.firstName;
    this.order.lastName = this.lastName;
    this.order.address = this.address;
    this.order.country = this.country;
    this.order.city = this.city;
    this.order.pinCode = this.pinCode;
    this.order.phone = this.phone;
    this.order.shippingId = this.shippingMethods[parseInt(this.shippingMethod)-1].id;
    this.order.paymentId = this.paymentMethods[parseInt(this.paymentMethod)-1].id;
    this.order.state = 'processing';
    this.order.totalPrice = this.calculateTotal()
    return this.order;
  }

  removeFromStock() {
    this.shoppingCart.forEach((el: { product: { id: number; }; quantity: number; }) => this.cartService.updateStock(el.product.id, el.quantity));
  }

  confirmOrder() {
    this.makeProductsList();
    this.order = this.makeOrder();
    this.ordersService.insertOrder(this.order).subscribe((data: Order): Order => this.order = data);
    this.removeFromStock();
    this.shoppingCart = [];
    this.cartItems = [];
    this.cartService.emptyShoppingCart(this.cartItems);
  }

  get firstName() {
    return this.orderForm.value.firstName;
  }

  get lastName() {
    return this.orderForm.value.lastName;
  }

  get address() {
    return this.orderForm.value.address;
  }

  get addressOpt() {
    return this.orderForm.value.addressOpt;
  }

  get country() {
    return this.orderForm.value.country;
  }

  get city() {
    return this.orderForm.value.city;
  }

  get pinCode() {
    return this.orderForm.value.pinCode;
  }

  get phone() {
    return this.orderForm.value.phone;
  }

  get paymentMethod() {
    return this.orderForm.value.paymentMethod;
  }

  get shippingMethod() {
    return this.orderForm.value.shippingMethod;
  }
}
