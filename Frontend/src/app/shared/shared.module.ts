import { LegalResponsePipe } from './../core/pipes/legal-response.pipe';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleColorComponent } from './components/toggle-color/toggle-color.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    ToggleColorComponent,
    LoadingComponent,
    ParticlesComponent,
    HeaderComponent,
    FooterComponent,
    LegalResponsePipe,
  ],
  imports: [
    CommonModule,RouterModule
  ], 
  exports: [
    ToggleColorComponent,
    LoadingComponent,
    ParticlesComponent,
    HeaderComponent,
    FooterComponent,
    LegalResponsePipe
  ]
})
export class SharedModule { }
