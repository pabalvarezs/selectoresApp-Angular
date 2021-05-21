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
    region      : ['',Validators.required],
    pais        : ['',Validators.required],
    frontera    : ['',Validators.required],
  })

  // llenar selectores

  regiones  : string[]      = [];
  paises    : PaisSmall[]   = [];
  fronteras : string[]      = [];

  // UI
  cargando : boolean = false;


  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones;

    // cuando cambie la region

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_)=>{
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region => this.paisesServices.getPaisesPorRegion(region)),
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;

      })

    //cuando cambia el pais

    this.miFormulario.get("pais")?.valueChanges
      .pipe(
        tap( () => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;

        }),
        switchMap( codigo => this.paisesServices.getPaisPorCodigo(codigo)  ),
      )
      .subscribe( pais => {
        this.fronteras = pais?.borders || [];
        this.cargando = false;
      })
  }

  guardar(){
    console.log(this.miFormulario.value);
  }
}
