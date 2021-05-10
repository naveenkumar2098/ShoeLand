import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() products!: Product[];
  @Input() searching!: boolean;
  @Output() stock: EventEmitter<any> = new EventEmitter();

  productId!: number;
  product!: Product;
  addedToCart: boolean = false;
  // isReadonly: boolean = true;
  // rate: number;
  // max: number = 5;

  constructor(private cartService: CartService, private productsService: ProductsService) {
    // this.rate = this.product.rating;
  }

  ngOnInit(): void {
  }

  addToCart(productId: number) {
    this.productId = productId;
    this.addedToCart = this.cartService.addToCart(productId, 1);
    setTimeout(() => this.addedToCart = false, 2000);
    this.stock.emit();
  }

}
