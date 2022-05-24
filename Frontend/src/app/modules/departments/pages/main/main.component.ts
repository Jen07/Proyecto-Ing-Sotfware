import Alerts from '@core/utils/alerts';
import Department from '@core/models/department';
import { DepartmentsService } from './../../services/departments.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalizationService } from '@core/services/localization.service';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy  {
  public form!: FormGroup;

  /**
   * Lista de observadores suscritos.
   */
     observers: Subscription[] = [];

  constructor(
    public service: DepartmentsService,
    public localizationService: LocalizationService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.createForm();
  }

  provinces:Array<any> = []
  cantons:Array<any> = []
  districts:Array<any> = []

  /**
   * Este metodo crea el objeto a utilizar para el formulario.
   * @returns FormGroup Con las validaciones necesarias
   */
  private createForm(): FormGroup {
    return this.formBuilder.group({
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      canton: ['', [Validators.required]],
      district: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.observers.push(
      // Observa cambios en el objeto de edicion para actualizar el funcionario.
      this.service.editing.subscribe(async (data) => {
        this.loadEdit(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.observers.forEach((element) => {
      element.unsubscribe();
    });
  }

  selectCountry(){
    this.provinces = this.localizationService.provinces.value.filter((element:any) => element.id_country == this.form.get('country')?.value)
    this.cantons = [];
    this.districts = [];

    this.form.get('province')?.setValue('');
    this.form.get('canton')?.setValue('');
    this.form.get('district')?.setValue('');
  }

  selectProvince(){
    this.cantons = this.localizationService.cantons.value.filter((element:any) => element.id_province == this.form.get('province')?.value)
    this.districts = [];

    this.form.get('canton')?.setValue('');
    this.form.get('district')?.setValue(''); 
  }

  selectCanton(){
    this.districts = this.localizationService.districts.value.filter((element:any) => element.id_canton == this.form.get('canton')?.value)
    this.form.get('district')?.setValue('');
  }

  async loadEdit(data: Department) {
    if(data.id){
      
      
      const localization = await this.localizationService.getDistrict(data.district);
     
      this.form.get("country")?.setValue(localization.country_id);
      this.selectCountry();
  
      this.form.get("province")?.setValue(localization.province_id);
      this.selectProvince();
  
      this.form.get("canton")?.setValue(localization.canton_id);
      this.selectCanton();
  
      this.form.get("district")?.setValue(localization.id);
    }
  
    this.form.get('description')?.setValue(data.description || '');
  }


  /**
   * Este metodo se ejecuta al enviar el formulario, valida que se haya podido hacer la accion.
   * @returns void
   */
   async prepareRegister() {
    if (!this.validateForm()) return 
    let result = false;

    // Si existe un id en el elemento de edicion es por que se esta editando.
    if(this.service.editing.value.id){
      result = await this.service.edit({id: this.service.editing.value.id, description:this.form.get('description')?.value, district: this.form.get('district')?.value})  
      if(result) this.confirmEdit();  // Si el resultado es valido procede al siguiente metodo.
    }else{
      result = await this.service.create({description:this.form.get('description')?.value, district: this.form.get('district')?.value})
      if(result) this.confirmRegister();  // Si el resultado es valido procede al siguiente metodo.
    }

    // Si el resultado fue válido reinicia y actualiza el listado.
    if(result){
      this.form.reset();
      this.service.getAll();
      this.form.get("country")?.setValue("");
      this.selectCountry();
    }else{
      Alerts.simpleToast("No se pudo procesar la soliciutd", "error");
    }
  }




  confirmRegister() {
    Alerts.simpleToast('Registrado correctamente', 'success')
  }

  confirmEdit() {
    Alerts.simpleToast('Modificado correctamente', 'success')
    this.service.editing.next({})
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

  cancelEdit() {
    this.service.editing.next({});
    this.form.get("country")?.setValue("");
    this.selectCountry();
  }
  
}