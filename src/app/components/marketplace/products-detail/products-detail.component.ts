import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  cartProduct;
  totalPrice;

  constructor(private cartService: CartService) {
    this.cartProduct = cartService.myData$;
    this.totalPrice = cartService.totalPrice$;
   }

   clearCart(){
    this.cartService.clearCart();
   }

   removeItemToCart(index: number) {
    this.cartService.removeProductFromCart(index);
}

  ngOnInit(): void {
    this.cartService.getCartProducts();
  }

}
