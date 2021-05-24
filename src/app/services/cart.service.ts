import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  product: Product | undefined;
  items: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // public items: any;
  cartItems: Cart[] = [];

  constructor(private productsService: ProductsService) { }

  addToCart(productId: number, quantity: number, editing: boolean = false): boolean {
    productId = parseInt(`${productId}`);
    quantity = parseInt(`${quantity}`);
    let duplicateIndex!: number;
    let duplicateQuantity: number = 1;
    // debugger;
    // console.log(this.cartItems);
    // let cartItems = this.items;
    this.cartItems.forEach((el, idx) => {
      if(el['productId'] === productId){
        duplicateIndex = idx;
        // el.quantity += 1;
        duplicateQuantity += quantity;
      }
    });
    if(duplicateIndex !== undefined) {
      this.cartItems.splice(duplicateIndex, 1, { 'productId': productId, 'quantity': !editing ? duplicateQuantity : quantity });
    }else {
      this.cartItems.push({ 'productId': productId, 'quantity': quantity });
    }
    this.items.next(this.cartItems);
    // this.items = this.cartItems;
    return true;
  }

  // getItems() {
  //   return this.items;
  // }

  removeFromCart(shoppingCart: any, productId: number) {
    shoppingCart.forEach((el: { product: { id: number; }; }, idx: any) => el.product.id === productId ? shoppingCart.splice(idx, 1) : null);
    let cartOgFormat: Cart[] = [];
    shoppingCart.forEach((el: { product: { id: any; }; quantity: any; }) => cartOgFormat.push({ 'productId': el.product.id, 'quantity': el.quantity }));
    this.cartItems = cartOgFormat;
    this.items.next(this.cartItems);
  }

  updateStock(productId: number, quantity: number) {
    this.productsService.listOne(productId).subscribe((data: Product): void => {
      this.product = data;
      this.product.stock -= quantity;
      this.productsService.editProductStock(this.product).subscribe(data => this.product = data); 
    });
  }

  emptyShoppingCart(cart: Cart[]) {
    this.cartItems = cart;
    this.items.next(this.cartItems);
  }
}
