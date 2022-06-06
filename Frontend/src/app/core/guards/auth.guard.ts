import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Esta clase se encarga de validar si el usuario 
 * ha realizado un login valido en la aplicacion. 
 */
export class AuthGuard implements CanActivate {

  constructor(
    private auth:AuthService, 
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.auth.isLogged()){
     
     //TODO: ACTIVAR LUEGO
      this.router.navigate(["/login"])
    }

    return true;
  }
  
}
