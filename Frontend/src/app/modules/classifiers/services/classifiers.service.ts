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

  public editing: BehaviorSubject<Classifier>;

  /**
   * Listado de clasificadores observable.
   */
  public list: BehaviorSubject<Classifier[]>;
    public fullList:Classifier[];

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}classifier/`;
    this.list = new BehaviorSubject<Classifier[]>([]);
    this.fullList = [];
    this.editing = new BehaviorSubject<Classifier>({});
    this.getAll();
  }

  /**
   * Este metodo obtiene todos los clasificadores.
   */
  async getAll() {
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
      this.fullList = data;
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
          return (data.status === 200)
        }),
        catchError((err) => {
          return of(false);
        })
      )
    );
  }

  /**
   * Este metodo sirve para llamar al clasificador a editar.
   */
  async loadEdit(id: number) {
    return firstValueFrom(
      this.http.get(`${this.endpoint}/${id}`).pipe(
        map((data: any) => {
          return data.status === 200 ? this.editing.next(data.item) : this.editing.next({}); 
        }),
        catchError((err) => {
          return of(undefined);
        })
      )
    );
  }

   /**
   * Este metodo sirve para crear un clasificador.
   */
     async create(classifier:Classifier) {
      return firstValueFrom(
        this.http.post(`${this.endpoint}`, classifier).pipe(
          map((data: any) => {
            return data.status === 200
          }),
          catchError((err) => {
            return of(false);
          })
        )
      );
    }

   /**
   * Este metodo sirve para crear un clasificador.
   */
    async edit(classifier:Classifier) {
      return firstValueFrom(
        this.http.put(`${this.endpoint}/${classifier.id}`, classifier).pipe(
          map((data: any) => {
            return (data.status === 200)
          }),
          catchError((err) => {
            return of(false);
          })
        )
      );
    }


    filterList(filter: string) {
      if (filter.length === 0) {
        this.list.next(this.fullList)
        return;
      }
  
      this.list.next(
        this.fullList.filter((item) =>
          item.description?.toUpperCase()?.includes(filter.toUpperCase())
        )
      );
    }

}