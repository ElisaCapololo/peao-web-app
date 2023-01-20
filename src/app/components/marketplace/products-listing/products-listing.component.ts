import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {

  products: Observable<Product[]>;
  private productsCollection: AngularFirestoreCollection<Product>

  constructor(afs: AngularFirestore, private cardService: CartService) { 
    this.productsCollection = afs.collection<Product>('productHat');
    this.products = this.productsCollection.valueChanges();
  }

  //Function to add product to cart 
  addProductToCart(product: Product){
    this.cardService.addProductToCart(product);
  }



  ngOnInit(): void {
  }

}
