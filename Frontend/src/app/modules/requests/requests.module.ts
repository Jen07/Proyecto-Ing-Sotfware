import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestListComponent } from './components/request-list/request-list.component';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    RequestListComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class RequestsModule { }
