import  Alerts  from '@core/utils/alerts';
import  RequestData from '@core/models/requestData';
import { AuthService } from './../../../../core/services/auth.service';
import { ClassifiersService } from './../../../classifiers/services/classifiers.service';
import { RequestService } from './../../services/request.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public requestService: RequestService,
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public classifierService: ClassifiersService
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.requestService.getAll();
  }

  getMax() {
    return this.form.get('max')?.value || '2022-09-18';
  }

  getMin() {
    return this.form.get('min')?.value || '2021-09-18';
  }

  clearFilters() {
    this.form.reset();
    this.form.get('classifier')?.setValue(0);
    this.form.get('state')?.setValue(0);
    this.filterRequests()
  }

  createRequest() {
    this.router.navigate(['/request/create']);
  }

  selectRequest(id: number | undefined) {
    this.requestService.selected.next(
      this.requestService.list.value.find((data) => data.id === id) || {}
    );
    this.router.navigate([`request`]);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      classifier: [0],
      state: [0],
      min: [''],
      max: [''],
    });
  }

  filterRequests() {
    this.requestService.filterList(
      this.form.get('classifier')!.value,
      this.form.get('state')!.value,
      this.form.get('min')!.value,
      this.form.get('max')!.value
    );
  }


    /**
   * Este metodo solicita la confirmacion para la eliminacion de un departamento.
   * @param item [department] Departamento a eliminar.
   */
     prepareDelete(event:Event, item: number|undefined) {
      event.stopPropagation();
      Alerts.promiseConfirm( `Seguro deseas eliminar esta solicitud`, 'Esta acción no es reversible').then((result: { isConfirmed: any; }) => {
        if (item && result.isConfirmed) {
          this.deleteConfirmed(item);
        }
      })
    }
  
    /**
     * Este metodo elimina un departamento despues de que el usuacio confirma.
     * @param id [number] ID de departamento a eliminar.
     */
    deleteConfirmed(id: number) {
      this.requestService.delete(id).then((result: boolean) => {
        if (result) {
          Alerts.simpleAlert('Eliminado con éxito', 'Se eliminó correctamente el departamento', 'success')
          this.requestService.getAll();
        } else {
          Alerts.simpleAlert('No se pudo eliminar', 'Existen personas vinculadas a este departamento', 'error')
        }
      });
    }
  
}