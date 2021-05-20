import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesModuleRoutingModule } from './paises-module-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';


@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    PaisesModuleRoutingModule
  ]
})
export class PaisesModuleModule { }
