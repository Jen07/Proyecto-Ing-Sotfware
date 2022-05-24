import { Subscription } from 'rxjs';
import Alerts from 'src/app/core/utils/alerts';
import { ClassifiersService } from './../../services/classifiers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  /**
   * Lista de observadores suscritos.
   */
  observers: Subscription[] = [];

  constructor(
    public service: ClassifiersService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.observers.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.observers.push(
      // Observa cambios en el objeto de edicion para actualizar el funcionario.
      this.service.editing.subscribe((data) => {
        this.form.get('description')?.setValue(data.description || '');
      })
    );
  }

  /**
   * Este metodo crea el objeto a utilizar para el formulario.
   * @returns FormGroup Con las validaciones necesarias
   */
  private createForm(): FormGroup {
    return this.formBuilder.group({
      description: ['', [Validators.required]],
    });
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
      result = await this.service.edit({id: this.service.editing.value.id, description:this.form.get('description')?.value})  
      if(result) this.confirmEdit();  // Si el resultado es valido procede al siguiente metodo.
    }else{
      result = await this.service.create({description:this.form.get('description')?.value})
      if(result) this.confirmRegister();  // Si el resultado es valido procede al siguiente metodo.
    }

    // Si el resultado fue válido reinicia y actualiza el listado.
    if(result){
      this.form.reset();
      this.service.getAll();
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
  }
}