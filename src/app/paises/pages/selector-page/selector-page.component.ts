import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    region : ['',Validators.required]
  })

  // llenar selectores

  regiones : string[] = [];

  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones;
  }

  guardar(){
    console.log(this.miFormulario.value);
  }
}
