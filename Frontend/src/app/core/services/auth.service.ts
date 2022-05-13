import { User } from './../models/user';
import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() userData: User | undefined;
  @Output() authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  loginUser(email: string, password: string) {
    email = email.toLowerCase();

    /* Prueba temporal mientras no esta el backend*/
    if (email === 'luis.leiton.cr@gmail.com' && password === '123123123') {
      this.userData = { email: email, password: password };
    }

    return false;
  }

  /**
   * Este metodo verifica si el usuario inicio sesion.
   * @returns [boolean] indicando si el usuario esta logueado o no.
   */
  isLogged() {
    return this.userData;
  }

  /**
   * Este método verifica si la clave de doble autenticación es válida.
   * @param secret [number] número ingresado por el usuario.
   * @returns [boolean] indicando si la clave fue valida o no.
   */
  doubleAuth(secret: number) {
    /* Prueba temporal mientras no esta el backend*/
    let response = secret === 123123;
    this.authenticated = true;
    return response;
  }

  /**
   *  Este método se encarga de destruir los datos 
   *  almacenados del usuario.
   */
  destroyUser(){
    this.userData = undefined;
    this.authenticated = false;
  }

}