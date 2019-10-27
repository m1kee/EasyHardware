import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private env = environment;
    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get(this.env.apiUrl + 'Category');
    }
}
