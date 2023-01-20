import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartProducts;
  totalPrice;

  constructor(cartService: CartService) { 
    this.cartProducts = cartService.myData$;
    this.totalPrice = cartService.totalPrice$;
  }

  ngOnInit(): void {
  }

}
