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

  
  public editing: BehaviorSubject<Department>;


  /**
   * Listado de departamentos observable.
   */
  public list: BehaviorSubject<Department[]>;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}department/`;
    this.list = new BehaviorSubject<Department[]>([]);
    this.editing = new BehaviorSubject<Department>({});
    this.getAll();
  }

  /**
   * Este metodo obtiene todos los departamentos.
   */
  async getAll() {
    await firstValueFrom(
      this.http.get(this.endpoint).pipe(
        map((data: any) => {
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

  /**
   * Este metodo sirve para eliminar un departamento.
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
     async create(department:Department) {
      return firstValueFrom(
        this.http.post(`${this.endpoint}`, department).pipe(
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
    async edit(department:Department) {
      return firstValueFrom(
        this.http.put(`${this.endpoint}/${department.id}`, department).pipe(
          map((data: any) => {
            return (data.status === 200)
          }),
          catchError((err) => {
            return of(false);
          })
        )
      );
    }
}
