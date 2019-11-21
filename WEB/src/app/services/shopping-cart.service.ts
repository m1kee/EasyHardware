import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ShoppingCartItem } from '@domain/shopping-cart-item';
import { IProduct } from '@domain/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
    public storageKey: string = 'shopping-cart';
    constructor(private localStorageService: LocalStorageService) { }

    get(): ShoppingCartItem[] {
        return this.localStorageService.get(this.storageKey) || [];
    };

    getById(products: ShoppingCartItem[], productId: number): ShoppingCartItem {
        if (products && products.length > 0) {
            let cartItem = products.filter(p => p.Id === productId);
            if (cartItem && cartItem[0]) {
                return cartItem[0];
            }
        }

        return null;
    };

    add(product: IProduct) {
        // get storage items before
        let products = this.get();
        if (!products || products.length === 0) {
            // if there is no items, just add it
            this.new(product, products);
        } else if (products && products.length > 0) {
            // search if the product to add is already in the product list
            let cartItem = this.getById(products, product.Id);
            if (cartItem) {
                // add +1 to the count and re insert to the array
                cartItem.Count++;
                // replace it in the products array
                this.replace(product.Id, cartItem, products);
            } else {
                // if the product doesn't exist in the storage products, then  add it
                this.new(product, products);
            }
        }
    };

    new(product: IProduct, products: ShoppingCartItem[]) {
        let shoppingCartItem: ShoppingCartItem = new ShoppingCartItem();
        shoppingCartItem.Item = product;
        shoppingCartItem.Count = 1;
        shoppingCartItem.Id = product.Id;

        products.push(shoppingCartItem);
        this.localStorageService.set(this.storageKey, products);
    };

    replace(id: any, cartItem: ShoppingCartItem, products: any[]) {
        products.splice(products.findIndex((element) => element.Id === id), 1, cartItem);
        // reset the shopping cart values
        this.localStorageService.set(this.storageKey, products);
    };

    remove(id: any, products?: any[]) {
        if (!products || products.length === 0) {
            products = this.get();
        }

        products.splice(products.findIndex((element) => element.Id === id), 1);
        // reset the shopping cart values
        this.localStorageService.set(this.storageKey, products);
    }

    substract(product: any) {
        // get storage items
        let products = this.get();
        if (!products || products.length === 0) {
            // if there is no items, just return
            return;
        } else if (products && products.length > 0) {
            // search if the product to add is already in the product list
            let cartItem: ShoppingCartItem = this.getById(products, product.Id);
            if (!cartItem) {
                return;
            } else if ((cartItem.Count - 1 === 0)) {
                this.remove(product.Id, products);
            } else {
                // add -1 to the count and re insert to the array
                cartItem.Count--;
                // replace it in the products array
                this.replace(product.Id, cartItem, products);
            }
        }
    };

    clear() {
        return this.localStorageService.clear(this.storageKey);
    };
}
