import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassifiersRoutingModule } from './classifiers-routing.module';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ClassifiersRoutingModule
  ]
})
export class ClassifiersModule { }
