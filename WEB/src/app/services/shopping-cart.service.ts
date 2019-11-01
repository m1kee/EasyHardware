import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ShoppingCartItem } from '../domain/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
    public storageKey: string = 'shopping-cart';
    constructor(private localStorageService: LocalStorageService) { }

    get() {
        return this.localStorageService.get(this.storageKey);
    }

    getById(productId: number) {
        let products = this.get();

        if (products && products.length > 0) {
            return products.filter(p => p.Id === productId).shift();
        }

        return null;
    }

    add(product: any) {
        // get storage items before
        let products = this.get();
        if (!products || products.length === 0) {
            // if there is no items, just add it
            this.new(product, products);
        } else if (products && products.length > 0) {
            // search if the product to add is already in the product list
            let cartItem = this.getById(product.Id);
            if (cartItem.Id) {
                // add +1 to the count and re insert to the array
                cartItem.Count++;
                // replace it in the products array
                this.replace(product.Id, cartItem, products);
            } else {
                // if the product doesn't exist in the storage products, then  add it
                this.new(product, products);
            }
        }
    }

    new(product: any, products: any[]) {
        let shoppingCartItem: ShoppingCartItem = new ShoppingCartItem();
        shoppingCartItem.Item = product;
        shoppingCartItem.Count = 1;
        shoppingCartItem.Id = product.Id;

        products.push(shoppingCartItem);
    }

    replace(id: any, cartItem: ShoppingCartItem, products) {
        products.splice(products.indexOf((p) => p === id), 1, cartItem);
        // reset the shopping cart values
        this.localStorageService.set(this.storageKey, products);
    }

    remove(product: any) {
        // get storage items
        let products = this.get();
        if (!products || products.length === 0) {
            // if there is no items, just return
            return;
        } else if (products && products.length > 0) {
            // search if the product to add is already in the product list
            let cartItem: ShoppingCartItem = this.getById(product.Id);
            if (!cartItem) {
                return;
            } else if ((cartItem.Count - 1 === 0)) {
                this.remove(product);
            } else {
                // add -1 to the count and re insert to the array
                cartItem.Count--;
                // replace it in the products array
                this.replace(product.Id, cartItem, products);
            }
        }
    }
}
