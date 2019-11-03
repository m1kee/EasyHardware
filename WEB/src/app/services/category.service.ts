import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ICategory } from '@domain/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private env = environment;
    public storageKey: string = 'categories';
    private controllerName: string = 'Category';
    private controllerUrl: string = `${this.env.apiUrl}/${this.controllerName}`;
    constructor(private httpClient: HttpClient) { }

    getAll(onlyUnparent: boolean) {
        return this.httpClient.get(`${this.controllerUrl}/GetAll/${onlyUnparent}`);
    }

    getById(id: number) {
        return this.httpClient.get(`${this.controllerUrl}/GetById/${id}`);
    }

    getByCode(code: string) {
        return this.httpClient.get(`${this.controllerUrl}/GetByCode/${code}`);
    }

    post(category: ICategory) {
        return this.httpClient.post(`${this.controllerUrl}`, category);
    }

    put(id: number, category: ICategory) {
        return this.httpClient.put(`${this.controllerUrl}/${id}`, category);
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.controllerUrl}/${id}`);
    }
}
