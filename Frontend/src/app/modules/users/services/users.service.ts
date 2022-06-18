import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, firstValueFrom, BehaviorSubject, catchError, of } from 'rxjs';
import UserModel from '@core/models/user2';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Endpoint al cual este servicio hara peticiones.
   */
  private endpoint: string;

  public editing: BehaviorSubject<UserModel>;

  /**
   * Listado de departamentos observable.
   */
  public list: BehaviorSubject<UserModel[]>;
  public fullList:UserModel[];

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}user/`;
    this.list = new BehaviorSubject<UserModel[]>([]);
    this.fullList = [];
   this.editing = new BehaviorSubject<UserModel>({});
    this.getAll();
  }

  /**
   * Este metodo obtiene todos los departamentos.
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
   * Este metodo sirve para eliminar un departamento.
   */

  async delete(id: number) {
    return firstValueFrom(
      this.http.delete(`${this.endpoint}${id}`).pipe(
        map((data: any) => {
          return data.status === 200;
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
          return data.status === 200
            ? this.editing.next(data.item)
            : this.editing.next({});
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
  async create(user: UserModel) {
    return firstValueFrom(
      this.http.post(`${this.endpoint}`, user).pipe(
        map((data: any) => {
          return data.status === 200;
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
  async edit(user: UserModel) {
    return firstValueFrom(
      this.http.put(`${this.endpoint}/${user.id}`, user).pipe(
        map((data: any) => {
          return data.status === 200;
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
        item.name?.toUpperCase()?.includes(filter.toUpperCase())
      )
    );
  }
}
