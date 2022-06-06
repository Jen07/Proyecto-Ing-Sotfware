import { AuthService } from './../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, catchError, of, firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import RequestData from '@core/models/requestData';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public selected: BehaviorSubject<RequestData>;

  /**
   * Endpoint al cual este servicio hara peticiones.
   */
   private endpoint: string;

  /**
   * Listado de departamentos observable.
   */
   public list: BehaviorSubject<RequestData[]>;

  constructor(private authService:AuthService, private http: HttpClient) {
    this.endpoint = `${environment.api}requests/`;
    this.list = new BehaviorSubject<RequestData[]>([]);
    this.selected = new BehaviorSubject<RequestData>({});
    this.getAll();
  }

  requestFirst(){
    if(!this.selected.value.response_date) return true;
    return (this.selected.value.date && this.selected.value.date <= this.selected.value.response_date)
  }

   /**
   * Este metodo obtiene todos los departamentos.
   */
     async getAll() {
      await firstValueFrom(
        this.http.post(this.endpoint,{id:this.authService.userData?.id}).pipe(
          map((data: any) => {
            console.log(data);
            
            return (data.status === 200) ? data.list : [];
          }),
          catchError((err) => {
            return of([]);
          })
        )
      ).then((data) => {
        this.list?.next(data);
      });
    }
  
}
