import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuboRoutingModule } from './cubo-routing.module'
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CuboRoutingModule
  ]
})
export class CuboModule { }
