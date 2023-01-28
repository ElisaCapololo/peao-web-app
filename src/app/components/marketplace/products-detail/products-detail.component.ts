import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  cartProduct;
  totalPrice;
  orderCollection;
  name = '';
  email = '';
  phone = '';
  address = '';
  message = '';

  constructor(private cartService: CartService, private afs: AngularFirestore) {
    this.cartProduct = cartService.myData$;
    this.totalPrice = cartService.totalPrice$;
    this.orderCollection = afs.collection<Order>('receiving-data');
  }

  clearCart() {
    this.cartService.clearCart();
  }

  removeItemToCart(index: number) {
    this.cartService.removeProductFromCart(index);
  }

  private clearForm(){
    this.name = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  placeOrder(){
    const products = this.cartService.getCartProducts();
    if(products.length <= 0){
      this.message = "Adiciona Peão no carrinho";
      return alert(this.message) ;
    }
    this.orderCollection.add(
      {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        orderProducts: products
      }
    )
    this.cartService.clearCart();
    this.clearForm();
    
    /**Send items in whatsApp */
    let total = 0;
    let message = `
      Ola 👋🏾.

      Eu gostaria de encomendar os seguintes itens:

     ${products
       .map((item: any) => {
         total += +item.price;
         return '* ' + item.category + ': ' + item.color + ': ' + item.imageUrl + ': ' + item.price + '\n\n';
       })
       .join('')}
       o total é ${total}
    `;

    let encodedURI = encodeURIComponent(message);
    console.log(encodedURI);

    window.open(`https://wa.me/244942745477?text=${encodedURI}`, '_blank');
    this.message = "Enviado com sucesso";

  }
  

  ngOnInit(): void {
    this.cartService.getCartProducts();
  }

}
