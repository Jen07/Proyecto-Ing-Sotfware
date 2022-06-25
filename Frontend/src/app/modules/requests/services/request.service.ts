import { AuthService } from './../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, catchError, of, firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import Attachment from '@core/models/attachment';
import RequestData from '@core/models/requestData';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public selected: BehaviorSubject<RequestData>;

  /**
   * Endpoint al cual este servicio hara peticiones.
   */
  private endpoint: string;
  private endpoint2: string;

  /**
   * Listado de departamentos observable.
   */
  public completeList:Array<RequestData> = [];
  public list: BehaviorSubject<RequestData[]>;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.endpoint = `${environment.api}requests/`;
    this.endpoint2 = `${environment.api}attachment/`;
    this.list = new BehaviorSubject<RequestData[]>([]);
    this.selected = new BehaviorSubject<RequestData>({});
    this.getAll();
  }

  requestFirst() {
    if (!this.selected.value.response_date) return true;
    return (
      this.selected.value.date &&
      this.selected.value.date <= this.selected.value.response_date
    );
  }

  /**
   * Este metodo obtiene todas las solicitudes.
   */
   getAll() {
    if(this.authService.isLegal()){
      this.getAllLegal();
    }else{
      this.getAllUser();
    }
  }


  async getAllUser(){
    await firstValueFrom(
      this.http.post(this.endpoint, { id: this.authService.userData?.id }).pipe(
        map((data: any) => {
          return data.status === 200 ? data.list : [];
        }),
        catchError((err) => {
          return of([]);
        })
      )
    ).then((data) => {
      this.completeList = data;
      this.list?.next(data);
    });
  }

  async getAllLegal(){
    await firstValueFrom(
      this.http.get(this.endpoint).pipe(
        map((data: any) => {
          return data.status === 200 ? data.list : [];
        }),
        catchError((err) => {
          return of([]);
        })
      )
    ).then((data) => {
      this.completeList = data;
      this.list?.next(data);
    });
  }

  /**
   * Este metodo postea una solicitud.
   */
  async postRequest(request: RequestData, attachments: Array<Attachment>) {
    return await firstValueFrom(
      this.http
        .post(`${this.endpoint}/new`, {
          user_id: this.authService.userData?.id || 4,
          issue: request.issue,
          classifier: request.classifier,
          keyword: request.keyword,
          attachments: attachments,
        })
        .pipe(
          map((data: any) => {
            return of( data.status === 200);
          }),
          catchError((err) => {
            return of(false);
          })
        )
    ).then((data) => {
      return data;
    });
  }

  async listAttachment() {
    console.log(this.selected.value?.id);
    return await firstValueFrom(
      this.http.post(`${this.endpoint2}list`, {
        id_request: this.selected.value?.id || 0
      }).pipe(
          map((data: any) => {
            return data.status === 200 ? data.list : [];
          }),
          catchError((err) => {
            return of([]);
          })
        )
      ).then((data) => {
        return data;
      });
    }
  
  //Edit
  async editRequest(request: RequestData) {
    return await firstValueFrom(
      this.http
        .put(`${this.endpoint}edit`, {
          id_response_user: this.authService.userData?.id || 4,
          response_detail: request.response_detail,
          id_legal_response: request.id_legal_response,
          id: request.id
        })
        .pipe(
          map((data: any) => {
            return of( data.status === 200);
          }),
          catchError((err) => {
            return of(false);
          })
        )
    ).then((data) => {
      return data;
    });
  }


  filterList(classifier:number, state:number, min:Date, max:Date){

    let filteredList = this.completeList;

    if(classifier > 0){
      filteredList = filteredList.filter((element: RequestData)=> element.id_classifier == classifier);
    }

    if(state  > 0){
      filteredList = filteredList.filter((element)=> element.id_legal_response == state);
    }

    if(min){
      filteredList = filteredList.filter((element)=> element.date && element.date > min);
    }

    if(max){
      filteredList = filteredList.filter((element)=> element.date  && element.date < max);
    }

    this.list.next(filteredList);

  }

  async delete(id: number) {
    return firstValueFrom(
      this.http.delete(`${this.endpoint}/${id}`).pipe(
        map((data: any) => {
          return data.status === 200;
        }),
        catchError((err) => {
          return of(false);
        })
      )
    );
  }

}