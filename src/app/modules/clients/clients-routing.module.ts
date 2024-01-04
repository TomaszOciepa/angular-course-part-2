import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { authActivateGuard } from '../core/guards/auth-activate.guard';

const routes: Routes = [
  { path: '', component: ClientsComponent, canActivate: [authActivateGuard] },
  {
    path: 'dodaj',
    component: ClientFormComponent,
    canActivate: [authActivateGuard],
  },
  { path: ':id', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
