import { environment } from '@environments/environment';
import { firstValueFrom, of, catchError, map } from 'rxjs';
import Tokenizer from '@core/utils/tokenizer';
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

    console.log(email);
    console.log(password);

    return firstValueFrom(
      this.http.post(`${this.endpoint}login`, { email: email, password: password }).pipe(
        map((data: any) => {
          console.log(data);
          this.userData = { email: email, password: password };
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
  async doubleAuth(secret: number) {

    return firstValueFrom(
      this.http.post(`${this.endpoint}/login/secret`, { secret: secret }).pipe(
        map((data: any) => {
    
          this.authenticated = true;
          this.obtainToken();         //  Por ahora se guarda un token quemado 
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
  obtainToken() {
    if (this.userData && this.authenticated) {
      // Pedir el token al servidor con user data.
      // Departamento legal
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UgV2FsbG93aXR6IiwiZW1haWwiOiJXYW9AZ21haWwuY29tIiwiZGVwYXJ0bWVudCI6IkxlZ2FsIiwicGhvdG8iOiJodHRwczovL3d3dy5lbHNvbGRlZHVyYW5nby5jb20ubXgvZG9ibGUtdmlhLzhvNjJubS1idXp6LWxpZ2h0eWVhci9BTFRFUk5BVEVTL0xBTkRTQ0FQRV8xMTQwL0J1enolMjBMaWdodHllYXIifQ.1o8vgkTy0G_mxg6WfkhtVQwu_uzjDIITRr6c-_I2nJA';

      // Departamento otro
      //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UgV2FsbG93aXR6IiwiZW1haWwiOiJXYW9AZ21haWwuY29tIiwiZGVwYXJ0bWVudCI6Ik90cm8iLCJwaG90byI6Imh0dHBzOi8vd3d3LmVsc29sZGVkdXJhbmdvLmNvbS5teC9kb2JsZS12aWEvOG82Mm5tLWJ1enotbGlnaHR5ZWFyL0FMVEVSTkFURVMvTEFORFNDQVBFXzExNDAvQnV6eiUyMExpZ2h0eWVhciJ9.b5uTpnzGwcYWlR1TQ4_ZKImL5agPiD8IDxyqYlWrKKE"

      // Se decodifica y verifica si es valido.
      const data = Tokenizer.decode(token);

      if (data.state === 'success') {
        this.token = token;
        localStorage.setItem('id_token', this.token);
      }
    }
  }

  /**
   * Este método se encarga de cargar a memoria los datos
   * de un token para iniciar una sesion.
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    const data = Tokenizer.decode(token || '');
    if (data.state === 'success') {
      this.userData = {
        id: data.payload.id,
        email: data.payload.email,
        name: data.payload.name,
        department: data.payload.department,
        photo: data.payload.photo,
      };
    } else {
      //  Si no se puede decodificar correctamente el token en memoria se elimina.
      localStorage.removeItem('id_token');
    }

    if (token) {
      this.authenticated = true;
    }
  }
}