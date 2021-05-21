import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from "rxjs/operators";

import { PaisSmall } from '../../interfaces/paises.interfaces';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  constructor(  private fb : FormBuilder,
                private paisesServices : PaisesServiceService) { }
  
  miFormulario : FormGroup = this.fb.group({
    region  : ['',Validators.required],
    pais    : ['',Validators.required],
    frontera    : ['',Validators.required],
  })

  // llenar selectores

  regiones  : string[]      = [];
  paises    : PaisSmall[]   = [];
  fronteras : string[]      = [];

  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones;

    // cuando cambie la region

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        switchMap( region => this.paisesServices.getPaisesPorRegion(region)),
        tap((_)=>{
          this.miFormulario.get('pais')?.reset('');
        })
      )
      .subscribe( paises => {
        this.paises = paises;
      })

    //cuando cambia el pais

    this.miFormulario.get("pais")?.valueChanges
      .pipe(
        switchMap( codigo => this.paisesServices.getPaisPorCodigo(codigo)  ),
        tap( () => {
          // this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
        })
      )
      .subscribe( pais => {

        this.fronteras = pais?.borders || [];

        
      })
  }

  guardar(){
    console.log(this.miFormulario.value);
  }
}
