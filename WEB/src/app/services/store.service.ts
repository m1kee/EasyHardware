import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { IStore } from '@domain/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
    private env = environment;
    private controllerName: string = 'Store';
    private controllerUrl: string = `${this.env.apiUrl}/${this.controllerName}`;
    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get(`${this.controllerUrl}/GetAll`);
    }

    getById(id: number) {
        return this.httpClient.get(`${this.controllerUrl}/GetById/${id}`);
    }

    getByCode(code: string) {
        return this.httpClient.get(`${this.controllerUrl}/GetByCode/${code}`);
    }

    post(store: IStore) {
        return this.httpClient.post(`${this.controllerUrl}`, store);
    }

    put(id: number, store: IStore) {
        return this.httpClient.put(`${this.controllerUrl}/${id}`, store);
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.controllerUrl}/${id}`);
    }
}
