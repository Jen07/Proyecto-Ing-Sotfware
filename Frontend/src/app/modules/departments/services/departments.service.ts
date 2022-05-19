import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pipe, firstValueFrom, BehaviorSubject } from 'rxjs';
import Department from '@core/models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private endpoint:string;

  public list:BehaviorSubject<Department[]>

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}department/`
    this.list = new BehaviorSubject<Department[]>([]);
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
