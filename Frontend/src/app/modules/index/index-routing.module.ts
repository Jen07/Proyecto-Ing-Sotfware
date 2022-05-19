import { MaintanceGuard } from './../../core/guards/maintance.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren:() => import('../requests/requests.module').then(m => m.RequestsModule),
  },
  {
    path: "departments",
    canActivate: [MaintanceGuard],
    loadChildren:() => import('../departments/departments.module').then(m => m.DepartmentsModule),
  },
  {
    path: "classifiers",
    canActivate: [MaintanceGuard],
    loadChildren:() => import('../classifiers/classifiers.module').then(m => m.ClassifiersModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
