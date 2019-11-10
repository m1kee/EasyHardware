import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log('error: ', err);
            if (err.status === 401) {
                // si recibimos un error 401 desde la API forzamos el logout de la aplicacion
                this.authService.logout();
                location.reload(true);
            }

            // si es cualquier otro error, retornamos el error
            return throwError(err);
        }))
    }
}
