import Tokenizer from '@core/utils/tokenizer';

import { environment } from '@environments/environment';
import { firstValueFrom, of, catchError, map } from 'rxjs';
import { User } from './../models/user';
import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() userData: User | undefined;
  @Output() authenticated: boolean;
  @Output() token: string | undefined;

  /**
   * Endpoint al cual este servicio hara peticiones.
   */
  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}`;
    this.authenticated = false;
  }

  async loginUser(email: string, password: string) {
    email = email.toLowerCase();

    return firstValueFrom(
      this.http
        .post(`${this.endpoint}login`, { email: email, password: password })
        .pipe(
          map((data: any) => {
            this.userData = { id: data.item.id, email: email };

            return data.status === 200;
          }),
          catchError((err) => {
            return of(false);
          })
        )
    );
  }

  /**
   * Este metodo verifica si el usuario inicio sesion.
   * @returns [boolean] indicando si el usuario esta logueado o no.
   */
  isLogged() {
    return this.userData;
  }

  /**
   * Este metodo verifica si el usuario que inicio sesion es del departamento legal.
   * @returns [boolean] indicando si el usuario es del departamento legal o no.
   */
  isLegal() {
    return this.userData?.department === 'Legal';
  }

  /**
   * Este método verifica si la clave de doble autenticación es válida.
   * @param secret [number] número ingresado por el usuario.
   * @returns [boolean] indicando si la clave fue valida o no.
   */
  async doubleAuth(secret: string) {
    return firstValueFrom(
      this.http.post(`${this.endpoint}login/secret`, { secret: `${secret}` }).pipe(
        map((data: any) => {
          this.authenticated = true;
          this.obtainToken();
          return data.status === 200;
        }),
        catchError((err) => {
          return of(false);
        })
      )
    );
  }

  /**
   *  Este método se encarga de destruir los datos
   *  almacenados del usuario.
   */
  destroyUser() {
    this.userData = undefined;
    this.authenticated = false;
    this.token = undefined;
    localStorage.removeItem('id_token');
  }

  /**
   * Este método se encarga de obtener el token para
   * sesion luego de haber hecho el login exitoso.
   */
  async obtainToken() {
    if (this.userData && this.authenticated) {
      return firstValueFrom(
        this.http
          .post(`${this.endpoint}login/get_token`, { id: this.userData.id })
          .pipe(
            map((data: any) => {
              if (data.status === 200) {
                const token = data.token;
                const payload = Tokenizer.decode(token);
                this.token = token;
                localStorage.setItem('id_token', this.token || '');

                this.loadToken();
              }
            }),
            catchError((err) => {
              return of(false);
            })
          )
      );
    }
  }

  /**
   * Este método se encarga de cargar a memoria los datos
   * de un token para iniciar una sesion.
   */
  async loadToken() {
    /* Valida el token guardado en el servidor*/
    const validity = await this.validateToken();

    if (validity) {
      // Se asignan los datos de usuario.
      this.setTokenData();

      // Se asigna la foto del usuario.
      this.loadPicture();
    } else {
      //  Si el servidor no pudo validar el token se elimina.
      localStorage.removeItem('id_token');
    }
  }

  setTokenData() {
    const token = localStorage.getItem('id_token');
    const { payload, state } = Tokenizer.decode(token || '');

    if (state === 'success') {
      this.userData = {
        id: payload.data.id,
        email: payload.data.email,
        name: payload.data.name,
        department: payload.data.department,
        picture: this.userData?.picture,
      };

      this.authenticated = true;
    } else {
      //  Si no se puede decodificar correctamente el token se elimina.
      localStorage.removeItem('id_token');
    }
  }

  async validateToken() {
    return firstValueFrom(
      this.http.get(`${this.endpoint}login/validate_token`).pipe(
        map((data: any) => {
          this.authenticated = true;
          return data.status === 200;
        }),
        catchError((err) => {
          return of(false);
        })
      )
    );
  }

  async loadPicture() {
    firstValueFrom(
      this.http
        .post(`${this.endpoint}login/get_picture`, { id: this.userData!.id })
        .pipe(
          map((data: any) => {
            if (data.status === 200) {
              this.userData!.picture = data.item.picture;
            }

            return of(true);
          }),
          catchError((err) => {
            return of(false);
          })
        )
    );
  }
}
