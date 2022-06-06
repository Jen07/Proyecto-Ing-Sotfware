import { LegalResponsePipe } from './../../core/pipes/legal-response.pipe';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestListComponent } from './components/request-list/request-list.component';
import { MainComponent } from './pages/main/main.component';
import { RequestDetailComponent } from './components/request-detail/request-detail.component';


@NgModule({
  declarations: [
    RequestListComponent,
    MainComponent,
    RequestDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RequestsRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class RequestsModule { }
