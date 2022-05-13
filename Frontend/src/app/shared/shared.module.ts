import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleColorComponent } from './components/toggle-color/toggle-color.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    ToggleColorComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ToggleColorComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
