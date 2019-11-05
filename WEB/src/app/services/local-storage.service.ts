import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
        if (!window.localStorage) {
            console.error('Your browser doesn\'t support localStorage.');
        }
    }

    get(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    clear(key: string) {
        localStorage.removeItem(key);
    }
}
