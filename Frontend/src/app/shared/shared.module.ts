import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleColorComponent } from './components/toggle-color/toggle-color.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ParticlesComponent } from './components/particles/particles.component';

@NgModule({
  declarations: [
    ToggleColorComponent,
    LoadingComponent,
    ParticlesComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ToggleColorComponent,
    LoadingComponent,
    ParticlesComponent
  ]
})
export class SharedModule { }
