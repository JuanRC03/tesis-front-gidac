import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

 

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/variable/guardar-variable`,modelo);
  }
  
  

  

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/variable/guardar-variable`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/variable/obtener-variable/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/variable/listar-variable`);
  }

  public listarVariablesDifusion(id:any){
    return this.http.get(`${baserUrl}/variable/listar-variable-difucion/${id}`);
  }

  public listarCompletas(){
    return this.http.get(`${baserUrl}/variable/listar-variable-completas`);
  }

  public listarCompletasInvestigador(){
    return this.http.get(`${baserUrl}/variable/listar-variable-completas-investigador`);
  }

  public listarIncompletas(){
    return this.http.get(`${baserUrl}/variable/listar-variable-incompletas`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/variable/eliminar-variable/${id}`); 
  }

  public listarFamiliasVariables(){
    return this.http.get(`${baserUrl}/variable-familia/listar-familias-difusion`);
  }

  public listarFamiliasVariablesInvestigador(idFamilia:any, idProyecto:any){
    return this.http.get(`${baserUrl}/variable/listar-variable-investigador/${idFamilia}/${idProyecto}`);
  }

  
}