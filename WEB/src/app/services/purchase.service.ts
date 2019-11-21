import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartItem } from '@domain/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
    private env = environment;
    private controllerName: string = 'Purchase';
    private controllerUrl: string = `${this.env.apiUrl}/${this.controllerName}`;
    constructor(private httpClient: HttpClient) { }

    getAll(userId: number) {
        return this.httpClient.get(`${this.controllerUrl}/GetAll/${userId}`);
    }

    getById(id: number) {
        return this.httpClient.get(`${this.controllerUrl}/GetById/${id}`);
    }

    post(userId: number, shoppingCart: ShoppingCartItem[]) {
        return this.httpClient.post(`${this.controllerUrl}/Post/${userId}`, { ShoppingCartItems: shoppingCart });
    }
}
