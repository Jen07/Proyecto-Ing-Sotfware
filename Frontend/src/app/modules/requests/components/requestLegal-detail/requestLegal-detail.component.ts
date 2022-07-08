import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
//---------------------
import fileDownload from 'js-file-download';
import { base64StringToBlob } from 'blob-util';


import Alerts from '@core/utils/alerts';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Attachment from '@core/models/attachment';


@Component({
  selector: 'app-request-detail',
  templateUrl: './requestLegal-detail.component.html',
  styleUrls: ['./request-detail.component.scss', 'form-modal.component.scss']
})
export class RequestLegalDetailComponent implements OnInit {
  public form!: FormGroup;
  public attachments: Array<Attachment>;
  public showBtn = false;

  constructor(
    public requestService: RequestService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private loading: LoadingService,
  ) {
    this.attachments = [];
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      classifier: ['', [Validators.required]],
      issue: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  //envia los datos service
  async makeSubmit() {
    return await this.requestService.editRequest(
      {
        response_detail: this.form.get('issue')?.value,
        id_legal_response: this.form.get('classifier')?.value,
        id: this.requestService.selected.value.id
      });
  }

  ngOnInit(): void {
    if (!this.requestService.selected.value.id) {
      this.router.navigate(["/"])
    }
    if(this.requestService.selected.value.id_legal_response==2){
      this.showBtn =true;
    }
  }

  confirmRegister() {
    Alerts.simpleToast('Registrado correctamente', 'success')
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

  async prepareSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    this.loading.isLoading.next(true);
    const state = await this.makeSubmit();
    this.loading.isLoading.next(false);
    if (!state) {
      return Alerts.simpleToast('No se pudo generar', 'error');
    };
    Alerts.simpleToast('Se ha generado exitosamente', 'success');
    this.modalService.dismissAll();
    this.requestService.getAll();
    this.router.navigate(['/']);
  }

  async downloadAttachment(count: any) {

    if (count > 0) {
  
      const lista = await this.requestService.listAttachment();

      console.log("lista hecha", lista);
      console.log("++++++++++++");
      for (let index = 0; index < lista.length; index++) {
        console.log(index);
        const name = lista[index].comment;
        const stringFile = lista[index].file;
        const binaryData = stringFile.split(",")[1];
        const dataType = stringFile.split(",")[0].split(";")[0];
   
        const type =dataType.split("/")[1];
        const blob = base64StringToBlob(binaryData, dataType);
        fileDownload(blob, `${name}.${type}`);

      }

    } else {
      Alerts.simpleToast('NO HAY archivos', 'warning');
    }
  }

  closeResult = '';
  /* Abrir el modal */
  async open(content: any) {

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
