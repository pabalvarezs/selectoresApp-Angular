import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {

  private _regiones : string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private _baseUrl : string = "https://restcountries.eu/rest/v2"

  get regiones() : string[]{
    return [...this._regiones];
  }

  constructor( private http : HttpClient) { }


  
  getPaisesPorRegion(region : string) {
    const url : string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo : string) : Observable<Pais | null> {
    if(!codigo) {
      return of(null);
    }
    const url : string = `${this._baseUrl}/alpha/${codigo}`
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall(codigo : string) : Observable<PaisSmall> {

    const url : string = `${this._baseUrl}/alpha/${codigo}?fields=alpha3Code;name`
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigos(borders : string[]) : Observable<PaisSmall[]>{
    if(!borders){
      return of([])
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    })

    return combineLatest( peticiones);

  }
}
