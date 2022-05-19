import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    // Obtiene el token del storage.
    const tokenId = localStorage.getItem("token_id");

    // Si existe lo adjunta al request mediante un header de Bearer.
    if (tokenId) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + tokenId)
      });

      return next.handle(cloned);
    }

    // Si no existe envia el request sin token, eventualmente fallará para algunas solicitudes.
    else {
      return next.handle(req);
    }
  }
}