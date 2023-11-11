import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupera el token del local storage
    let token = localStorage.getItem('token');
    
    // Si el token existe
    if (token) {
        // Clona la solicitud y establece el encabezado de autorización con el token
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        // Envia la nueva solicitud con el encabezado de autorización
        return next.handle(authReq);
    } else {
        return next.handle(req);
    }
}
}