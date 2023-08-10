import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaVariableService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/equivalencia-variable/guardar-equivalencia-variable`,modelo);
  }

  public guardarDatosVariable(modelo:any){
    return this.http.post(`${baserUrl}/equivalencia-variable/guardar-datos-variable`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/equivalencia-variable/guardar-equivalencia-variable`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/equivalencia-variable${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/equivalencia-variable/listar-equivalencia-variable`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/equivalencia-variable${id}`); 
  }

  public obtenerPorProyecto(id:any){
    return this.http.get(`${baserUrl}/equivalencia-variable/listar-equivalencia-variable/por-poyecto/${id}`);
  }

  public obtenerVariablesDescargarProyecto(id:any){
    return this.http.get(`${baserUrl}/equivalencia-variable/listar-variable-descargar-proyecto/${id}`);
  }
}