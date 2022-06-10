import { LoadingService } from '@core/services/loading.service';
import { RequestService } from './../../services/request.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassifiersService } from './../../../classifiers/services/classifiers.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import Alerts from '@core/utils/alerts';
import Attachment from '@core/models/attachment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public form: FormGroup;
  public attachments: Array<Attachment>;

  constructor(
    private requestService: RequestService,
    private loading:LoadingService,
    public classifierService: ClassifiersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.attachments = [];
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.formBuilder.group({
      keyword: ['', [Validators.required, Validators.maxLength(30)]],
      classifier: ['', [Validators.required]],
      issue: ['', [Validators.required, Validators.maxLength(60)]],
      attachment: [''],
    });
  }

  async addAttachment(e: Event) {
    const element = e.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      if (this.isRepeated(fileList[0].name)) {
        Alerts.simpleToast('Este archivo ya existe', 'warning');
      } else if (fileList[0].size / 1048576 > 10) {
        Alerts.simpleToast('Maximo permitido 10 mb', 'warning');
      } else if (this.attachments.length >= 10) {
        Alerts.simpleAlert(
          'Atención',
          'Ha alcanzado el maximo permitido de 10 archivos',
          'warning'
        );
      } else {
        const newFile = fileList[0];
        console.log(await this.toBase64(newFile));

        this.attachments.push({
          name: newFile.name,
          size: newFile.size,
          data: (await this.toBase64(newFile)) || '',
        });
        this.form.get('attachment')?.setValue('');
      }
    } else {
      Alerts.simpleToast('No se pudo recuperar el archivo', 'warning');
    }
  }

  toBase64(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = (error) => rej(error);
    });
  }

  deleteAttachment(index: number) {
    this.attachments.splice(index, index + 1);
  }

  isRepeated(name: string) {
    return this.attachments.some((attach) => attach.name == name);
  }

  async prepareSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    this.loading.isLoading.next(true);
    const state = await this.makeSubmit()
    this.requestService.getAll();
    this.loading.isLoading.next(false);
    
    if (!state){
      return Alerts.simpleToast('No se pudo generar', 'error');
    };

    Alerts.simpleToast('Se ha generado exitosamente', 'success');

    this.router.navigate(['/']);
  }

  async makeSubmit() {
    return await this.requestService.postRequest(
      {
        issue: this.form.get('issue')?.value,
        classifier: this.form.get('classifier')?.value,
        keyword: this.form.get('keyword')?.value,
      },
      this.attachments
    )
  }
}