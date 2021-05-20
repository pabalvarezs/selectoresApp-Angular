import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'selector',
    loadChildren: () => import('./paises/paises-module.module').then(m => m.PaisesModuleModule)
  },
  { path: '**' , redirectTo: 'selector'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
