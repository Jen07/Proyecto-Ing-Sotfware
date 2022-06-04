import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, firstValueFrom, map, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  /**
   * Endpoint al cual este servicio hara peticiones.
   */
  private endpoint: string;

  /**
   * Listado de clasificadores observable.
   */
  public countries: BehaviorSubject<[]>;
  public provinces: BehaviorSubject<[]>;
  public cantons: BehaviorSubject<[]>;
  public districts: BehaviorSubject<[]>;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}`;
    this.countries = new BehaviorSubject<[]>([]);
    this.provinces = new BehaviorSubject<[]>([]);
    this.cantons = new BehaviorSubject<[]>([]);
    this.districts = new BehaviorSubject<[]>([]);

    this.loadLocalizations();
  }

  loadLocalizations() {
    this.http.get(`${this.endpoint}/country`).subscribe((data: any) => {
      this.countries.next(data.list);

      this.http.get(`${this.endpoint}/province`).subscribe((data: any) => {
        this.provinces.next(data.list);

        this.http.get(`${this.endpoint}/canton`).subscribe((data: any) => {
          this.cantons.next(data.list);

          this.http.get(`${this.endpoint}/district`).subscribe((data: any) => {
            this.districts.next(data.list);
          });
        });
      });
    });
  }

  async getDistrict(id:number | string | undefined){

  
      return firstValueFrom(
        this.http.get(`${this.endpoint}/district/${id}`).pipe(
          map((data: any) => {
            return (data.status === 200) ? data.item : {}
          }),
          catchError((err) => {
            return of({});
          })
        )
      );
    }
}