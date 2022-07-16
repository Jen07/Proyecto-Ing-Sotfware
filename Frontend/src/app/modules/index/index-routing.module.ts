import { MaintanceGuard } from './../../core/guards/maintance.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren:() => import('../requests/requests.module').then(m => m.RequestsModule),
  },
  {
    path: "users",
    canActivate: [MaintanceGuard],
    loadChildren:() => import('../users/users.module').then(m => m.UsersModule),
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
  },
  {
    path: "reports",
    canActivate: [MaintanceGuard],
    loadChildren:() => import('../reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: "cubo",
    canActivate: [MaintanceGuard],
    loadChildren:() => import('../cubo/cubo.module').then(m => m.CuboModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
