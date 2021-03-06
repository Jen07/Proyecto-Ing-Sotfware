import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Esta clase se encarga de validar si el usuario 
 * tiene acceso arealizar CRUD en la aplicacion. 
 */
export class MaintanceGuard implements CanActivate {

  constructor(
    private auth:AuthService, 
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(!this.auth.isLegal()){
      this.router.navigate(["/"])
    }
 
    return true;
  }
  
}
