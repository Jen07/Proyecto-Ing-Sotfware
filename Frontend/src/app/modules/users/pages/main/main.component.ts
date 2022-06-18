import Alerts from '@core/utils/alerts';
import UserModel from '@core/models/user2';
import { UserService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalizationService } from '@core/services/localization.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy  {
  public form!: FormGroup;
  public modalB: boolean = false;

  /**
   * Lista de observadores suscritos.
   */
     observers: Subscription[] = [];

  constructor(
    public service: UserService,
    public localizationService: LocalizationService,
    private formBuilder: FormBuilder,
    private modall: NgbModal,
    private modalService: NgbModal
  ) {
    //this.form = this.createForm();
  }

  // provinces:Array<any> = []
 

  ngOnInit(): void {
    this.observers.push(
      // Observa cambios en el objeto de edicion para actualizar el funcionario.
      this.service.editing.subscribe(async (data) => {
      //  this.loadEdit(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.observers.forEach((element) => {
      element.unsubscribe();
    });
  }

  prepareAdd(){
    Alerts.simpleToast('Registro en Proceso', 'success')
  }


  confirmRegister() {
    Alerts.simpleToast('Registrado correctamente', 'success')
  }

  confirmEdit() {
    Alerts.simpleToast('Modificado correctamente', 'success')
    this.service.editing.next({})
  }


  async prepareSubmit() {
  }

  // Este metodo valida que el formulario sea correcto, de lo contrario muestra una alerta.
  validateForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      Alerts.simpleToast('Faltan datos de formulario', 'error');
      return false;
    }
    return true;
  }

  filterList(e:Event){
    const filter = (e.target as HTMLInputElement).value;
    this.service.filterList(filter);
  }

  //*************** */

  closeResult = '';
  /* Abrir el modal */
  async open(content : any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  /* Propiedades del modal */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}