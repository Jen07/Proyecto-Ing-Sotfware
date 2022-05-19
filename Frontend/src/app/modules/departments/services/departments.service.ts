import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, firstValueFrom, BehaviorSubject, catchError, of } from 'rxjs';
import Department from '@core/models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  /**
   * Endpoint al cual este servicio hara peticiones.
   */
  private endpoint: string;

  /**
   * Listado de departamentos observable.
   */
  public list: BehaviorSubject<Department[]>;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}department/`;
    this.list = new BehaviorSubject<Department[]>([]);
    this.getAll();
  }

  /**
   * Este metodo obtiene todos los departamentos.
   */
  async getAll() {
    await firstValueFrom(
      this.http.get(this.endpoint).pipe(
        map((data: any) => {
          if (data.status === 200) {
            return data.list;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          return of([]);
        })
      )
    ).then((data) => {
      this.list?.next(data);
    });
  }

  /**
   * Este metodo sirve para eliminar un departamento.
   */

  async delete(id: number) {
    return firstValueFrom(
      this.http.delete(`${this.endpoint}/${id}`).pipe(
        map((data: any) => {
          if (data.status === 200) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((err) => {
          return of(false);
        })
      )
    );
  }
}
