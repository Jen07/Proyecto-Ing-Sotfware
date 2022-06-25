import { CreateComponent } from './pages/create/create.component';

import { RequestDetailComponent } from './components/request-detail/request-detail.component';

import { RequestLegalDetailComponent} from './components/requestLegal-detail/requestLegal-detail.component';

import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "request/create",
    component: CreateComponent,
  },
  {
    path: "request",
    component: RequestDetailComponent,
  },
  {
    path: "request/Legal",
    component: RequestLegalDetailComponent,
  },
  {
    path: "",
    component: MainComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
