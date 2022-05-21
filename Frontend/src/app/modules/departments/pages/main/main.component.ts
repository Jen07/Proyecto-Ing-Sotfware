import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalizationService } from '@core/services/localization.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public localizationService: LocalizationService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.createForm();
  }

  provinces:Array<any> = []
  cantons:Array<any> = []
  districts:Array<any> = []

  prepareRegister(){}

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

  ngOnInit(): void {}

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
}