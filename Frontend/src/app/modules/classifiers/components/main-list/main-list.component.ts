import { ClassifiersService } from './../../services/classifiers.service';
import { Component, OnInit } from '@angular/core';
import Classifier from '@core/models/classifier';
import Alerts from '@core/utils/alerts';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {

  constructor(public classifiersService:ClassifiersService) { }

  ngOnInit(): void {}

  
  /**
   * Este metodo solicita la confirmacion para la eliminacion de un departamento.
   * @param item [department] Departamento a eliminar.
   */
   prepareDelete(item: Classifier) {
    Alerts.promiseConfirm('Seguro deseas eliminar el clasificador', 'Esta accion no es revertible').then((result) => {
      if (result.isConfirmed) {
        this.deleteConfirmed(item.id);
      }
    })
  }

  /**
   * Este metodo elimina un departamento despues de que el usuacio confirma.
   * @param id [number] ID de departamento a eliminar.
   */
  deleteConfirmed(id: number) {
    this.classifiersService.delete(id).then((result) => {
      if (result) {
        Alerts.simpleAlert('Eliminado con éxito', 'Se eliminó correctamente el clasificador', 'success')
        this.classifiersService.getAll();
      } else {
        Alerts.simpleAlert('No se pudo eliminar', 'Verifique su conexión e intentelo nuevamente', 'error')
      }
    });
  }

  prepareEdit(id: number) {
    alert(id);
  }


}