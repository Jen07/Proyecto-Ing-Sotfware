import { IndexModule } from './modules/index/index.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './modules/login/pages/main/main.component';

const routes: Routes = [
  {
    path:'login',
    loadChildren:() => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path:'',
    canActivate:[AuthGuard],
    loadChildren:() => import('./modules/index/index.module').then(m => m.IndexModule),
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
