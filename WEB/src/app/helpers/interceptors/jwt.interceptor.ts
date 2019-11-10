import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Agregamos el token al header del request
        let loggedUser = this.authService.currentUserValue;
        if (loggedUser && loggedUser.Token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedUser.Token}`
                }
            });
        }

        // Una vez que añadimos el request al header, dejamos que este siga su rumbo a la API 
        return next.handle(request);
    }
}
