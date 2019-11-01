import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private env = environment;
    public storageKey: string = 'categories';
    constructor(private httpClient: HttpClient) { }

    getAll(onlyUnparent: boolean) {
        return this.httpClient.get(`${this.env.apiUrl}/Category/GetAll/${onlyUnparent}`);
    }

    getById(id: number) {
        return this.httpClient.get(`${this.env.apiUrl}/Category/GetById/${id}`);
    }

    getByCode(code: string) {
        return this.httpClient.get(`${this.env.apiUrl}/Category/GetByCode/${code}`);
    }

    post(category: any) {
        return this.httpClient.post(`${this.env.apiUrl}/Category`, category);
    }

    put(id: number, category: any) {
        return this.httpClient.put(`${this.env.apiUrl}/Category/${id}`, category);
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.env.apiUrl}/Category/${id}`);
    }
}
