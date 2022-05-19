import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, firstValueFrom, map, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import Classifier from '@core/models/classifier';

@Injectable({
  providedIn: 'root',
})
export class ClassifiersService {
  /**
   * Endpoint al cual este servicio hara peticiones.
   */
  private endpoint: string;

  /**
   * Listado de clasificadores observable.
   */
  public list: BehaviorSubject<Classifier[]>;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}classifier/`;
    this.list = new BehaviorSubject<Classifier[]>([]);
    this.getAll();
  }

  /**
   * Este metodo obtiene todos los clasificadores.
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
   * Este metodo sirve para eliminar un clasificador.
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