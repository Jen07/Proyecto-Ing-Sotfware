import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MainListComponent } from './components/main-list/main-list.component';


@NgModule({
  declarations: [
    MainComponent,
    MainListComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class DepartmentsModule { }
