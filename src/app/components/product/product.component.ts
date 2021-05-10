import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product!: Product;
  productId!: number;
  selectedImg: number = 0;

  stock!: number[];
  quantity: number = 1;

  addedToCart: boolean = false;
  successQnt!: number;
  
  constructor(private productsService: ProductsService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.productsService.listOne(this.productId).subscribe((data: Product): Product => {
      this.product = data;
      this.calcStock();
      return this.product;
    });
    this.checkAvailability();
  }

  changeSelectedImg(id: number) {
    this.selectedImg = id;
  }

  calcStock() {
    this.stock = [];
    for (let i = 0, l = this.product.stock; i < l; i++) this.stock.push(i);
  }

  checkAvailability() {
    this.cartService.cartItems.forEach(el => {
      if((el.productId === this.product.id) && (el.quantity === this.product.stock)) this.product.stock = 0
      else if(el.productId === this.product.id) this.product.stock -= el.quantity;
    })
    this.calcStock();
  }

  addToCart() {
    this.product.stock -= this.quantity;
    this.calcStock();
    this.addedToCart = this.cartService.addToCart(this.productId, this.quantity);
    setTimeout(() => this.addedToCart = false, 1500);
    this.successQnt = this.quantity;
    this.quantity = 1; 
  }

  ngOnDestroy() {
    this.checkAvailability();
  }

}
