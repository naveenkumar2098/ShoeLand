import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  step: number = 1;
  cartItems!: any;
  
  constructor(private cartService: CartService) { 
    this.cartService.items.subscribe(data => {
      console.log(data);
      this.cartItems = data;
    })
    // console.log(this.cartService.items)
  }

  ngOnInit(): void {
  }

}
