import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private env = environment;
    private controllerName: string = 'Product';
    private controllerUrl: string = `${this.env.apiUrl}/${this.controllerName}`;
    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get(this.controllerUrl);
    }

    getById(id: number) {
        return this.httpClient.get(`${this.controllerUrl}/${id}`);
    }

    post(category: any) {
        return this.httpClient.post(`${this.controllerUrl}`, category);
    }

    put(id: number, category: any) {
        return this.httpClient.put(`${this.controllerUrl}/${id}`, category);
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.controllerUrl}/${id}`);
    }
}
