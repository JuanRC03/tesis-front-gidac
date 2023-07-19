import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EstadoProyectoInvestigacionService {

  constructor(private http:HttpClient) { }

  public listarEstadoProyectoInvestigacion(){
    return this.http.get(`${baserUrl}/estado-proyecto-investigacion/`);
  }

  public agregarEstadoProyectoInvestigacion(estadoProyectoInvestigacion:any){
    return this.http.post(`${baserUrl}/estado-proyecto-investigacion/`,estadoProyectoInvestigacion);
  }
}
