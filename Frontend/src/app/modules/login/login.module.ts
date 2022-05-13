import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MainComponent } from './pages/main/main.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { SecretFormComponent } from './components/secret-form/secret-form.component';


@NgModule({
  declarations: [
    MainComponent,
    FormComponent,
    SecretFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {}
      }
    })
  ]
})

export class LoginModule { }