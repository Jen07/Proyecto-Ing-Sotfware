import { Component, OnInit } from '@angular/core';

import Alerts from 'src/app/core/utils/alerts';
import Department from '@core/models/department';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {
  private observers: Subscription[] = [];

  constructor(
    public userService: UserService,
    ) {}

  ngOnInit(): void {}

  /**
   * Este metodo solicita la confirmacion para la eliminacion de un departamento.
   * @param item [department] Departamento a eliminar.
   */
  prepareDelete(item: Department) {
    Alerts.promiseConfirm('Seguro deseas eliminar esta persona', 'Esta acción no es reversible').then((result) => {
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
    this.userService.delete(id).then((result) => {
      if (result) {
        Alerts.simpleAlert('Eliminado con éxito', 'Se eliminó correctamente el departamento', 'success')
        this.userService.getAll();
      } else {
        Alerts.simpleAlert('No se pudo eliminar', 'La persona esta relaciona en otra parte', 'error')
      }
    });
  }

  prepareEdit(id: number  | undefined) {
    // if(!id) return;
    // this.userService.loadEdit(id);
    Alerts.simpleAlert('Mensaje Aletando', 'Esta en Proceso', 'success')
  }

}
