import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStepsService {

  @Output()
  step!: BehaviorSubject<number>;

  /**
   * Este servicio controla el paso por el cual va la accion de login.
   * - Principal
   * - Doble auth
   * - Extras de ser necesarios
   */
  constructor() {
    this.step = new BehaviorSubject(1);
  }
  
}
