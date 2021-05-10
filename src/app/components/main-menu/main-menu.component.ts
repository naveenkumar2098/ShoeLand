import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  cart: any;
  
  constructor(public router: Router, private cartService: CartService) {
      this.cart = this.cartService.items.subscribe(data => {
        this.cart = data;
      })
  }

  ngOnInit(): void {
  }

}
