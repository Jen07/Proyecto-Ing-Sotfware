import { RequestsModule } from './../requests/requests.module';
import { MainComponent } from './../index/pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    loadChildren:() => import('../requests/requests.module').then(m => m.RequestsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
