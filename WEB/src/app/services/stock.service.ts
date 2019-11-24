import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { IStock } from '../domain/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
    private env = environment;
    private controllerName: string = 'Stock';
    private controllerUrl: string = `${this.env.apiUrl}/${this.controllerName}`;
    constructor(private httpClient: HttpClient) { }

    getAll(stockFilters: any) {
        return this.httpClient.post(`${this.controllerUrl}/GetAll`, stockFilters);
    }

    put(id: number, stock: IStock) {
        return this.httpClient.put(`${this.controllerUrl}/${id}`, stock);
    }
}
