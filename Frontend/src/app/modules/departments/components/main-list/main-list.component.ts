import { Component, OnInit } from '@angular/core';

import Alerts from 'src/app/core/utils/alerts';
import Department from '@core/models/department';
import { Subscription } from 'rxjs';
import { DepartmentsService } from './../../services/departments.service';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {
  private observers: Subscription[] = [];

  constructor(
    public departmentsService: DepartmentsService,
    ) {}

  ngOnInit(): void {}

  /**
   * Este metodo solicita la confirmacion para la eliminacion de un departamento.
   * @param item [department] Departamento a eliminar.
   */
  prepareDelete(item: Department) {
    Alerts.promiseConfirm('Seguro deseas eliminar el departamento', 'Esta accion no es reversible').then((result) => {
      if (item.id && result.isConfirmed) {
        this.deleteConfirmed(item.id);
      }
    })
  }

  /**
   * Este metodo elimina un departamento despues de que el usuacio confirma.
   * @param id [number] ID de departamento a eliminar.
   */
  deleteConfirmed(id: number) {
    this.departmentsService.delete(id).then((result) => {
      if (result) {
        Alerts.simpleAlert('Eliminado con éxito', 'Se eliminó correctamente el departamento', 'success')
        this.departmentsService.getAll();
      } else {
        Alerts.simpleAlert('No se pudo eliminar', 'Verifique su conexión e intentelo nuevamente', 'error')
      }
    });
  }

  prepareEdit(id: number  | undefined) {
    if(!id) return;
    this.departmentsService.loadEdit(id);
  }

}
