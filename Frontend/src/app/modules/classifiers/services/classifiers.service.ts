import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import Classifier from '@core/models/classifier';

@Injectable({
  providedIn: 'root'
})
export class ClassifiersService {

  private endpoint:string;
  public list:BehaviorSubject<Classifier[]>

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}classifier/`
    this.list = new BehaviorSubject<Classifier[]>([]);
    this.getAll();
  }

  async getAll() {
    await firstValueFrom(this.http.get(this.endpoint).pipe(
      map((data:any) => {
        if(data.status === 200){
          return data.list
        }else{
          return []
        }
      })
    )).then(data => {
      this.list?.next(data);
    })
  }

}
