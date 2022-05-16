import Tokenizer  from '@core/utils/tokenizer';
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

  constructor(
    private http:HttpClient,
  ) {
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
    this.obtainToken()
    return response;
  }

  /**
   *  Este método se encarga de destruir los datos 
   *  almacenados del usuario.
   */
  destroyUser(){
    this.userData = undefined;
    this.authenticated = false;
    this.token = undefined;
    localStorage.removeItem("id_token")
  }

  /**
   * Este método se encarga de obtener el token para 
   * sesion luego de haber hecho el login exitoso.
   */
  obtainToken(){
    if(this.userData && this.authenticated){
      
      // Pedir el token al servidor con user data.
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UgV2FsbG93aXR6IiwiZW1haWwiOiJXYW9AZ21haWwuY29tIiwicGhvdG8iOiJodHRwczovL3d3dy5lbHNvbGRlZHVyYW5nby5jb20ubXgvZG9ibGUtdmlhLzhvNjJubS1idXp6LWxpZ2h0eWVhci9BTFRFUk5BVEVTL0xBTkRTQ0FQRV8xMTQwL0J1enolMjBMaWdodHllYXIifQ.HvcI7hutYA__uQbmwkBP_ljKeAale-RFbn_z15os1Zs"
      
      // Se decodifica y verifica si es valido. 
      const data = Tokenizer.decode(token)
    
      if(data.state === "success"){
        this.token = token;
        localStorage.setItem("id_token", this.token);
      }
    }
  }

  /**
   * Este método se encarga de cargar a memoria los datos
   * de un token para iniciar una sesion.
   */
  loadToken(){
    const token = localStorage.getItem("id_token");
    const data = Tokenizer.decode(token||"");
    if(data.state === "success"){
      this.userData = {id:data.payload.id, email: data.payload.email, name: data.payload.name, photo:data.payload.photo}
     
    }else{
      //  Si no se puede decodificar correctamente el token en memoria se elimina.
      localStorage.removeItem("id_token");
    }
    
    if(token){
      this.authenticated = true;
    }
  }

}