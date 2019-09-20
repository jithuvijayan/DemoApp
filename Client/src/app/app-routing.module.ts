import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './features/index/index.component';

const routes: Routes = [
  { path: 'user-authentication',
  loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule) },
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
