import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  prepareRegister(){}

  /**
   * Este metodo crea el objeto a utilizar para el formulario.
   * @returns FormGroup Con las validaciones necesarias
   */
  private createForm(): FormGroup {
    return this.formBuilder.group({
     
      description: ['', [Validators.required]],
    });
  }

}