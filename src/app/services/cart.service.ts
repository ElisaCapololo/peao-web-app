import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _myData$ = new BehaviorSubject<Product[]>([]);
  private _totalPrice$ = new BehaviorSubject<number>(0);
  public myData$ = this._myData$.asObservable()
  public totalPrice$ = this._totalPrice$.asObservable();
  
  constructor(private localStorageServie: LocalStorageService) { }

  getCartProducts() {
    const products = JSON.parse(this.localStorageServie.getLocalStorageItem("products") || '[]');
    this._myData$.next(products);
    this._totalPrice$.next(products.reduce((acc: number, val: Product) => acc + val.price , 0));
    return products;
  }

  addProductToCart(product: Product) {
    const products = this.getCartProducts();
    const newProducts = [...products, product];
    this.saveCartProducts(newProducts);
    this._myData$.next(newProducts);
    this._totalPrice$.next(newProducts.reduce((acc: number, val: Product) => acc + val.price , 0));
  }

  removeProductFromCart(index: number) {
    const products = this.getCartProducts();
    products.splice(index, 1)
    const newProducts = [...products];
    this.saveCartProducts(newProducts);
    this._myData$.next(newProducts);
    this._totalPrice$.next(newProducts.reduce((acc: number, val: Product) => acc + val.price , 0));
  }

  saveCartProducts(products: Product[]) {
    const stringifiedProduct = JSON.stringify(products);
    this.localStorageServie.storeItemOnLocalStorage("products", stringifiedProduct);
  }

  isCartEmpty() {
    return (this.localStorageServie.getLocalStorageItem("products") || []).length <= 0;
  }

  clearCart() {
    this.localStorageServie.storeItemOnLocalStorage("products", []);
    this._myData$.next([]);
    this._totalPrice$.next(0);
  }
}
