import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfundidadService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/profundidad/guardar-profundidad`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/profundidad/actualizar-profundidad`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/profundidad/obtener-profundidad/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/profundidad/listar-profundidad`);
  }

  public listarEliminads(){
    return this.http.get(`${baserUrl}/profundidad/listar-profundidad-eliminada`);
  }

  public restaurar(id:any){
    return this.http.delete(`${baserUrl}/profundidad/restaurar-profundidad/${id}`); 
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/profundidad/eliminar-profundidad/${id}`); 
  }

  public obtenerPorMedida(id:any){
    return this.http.get(`${baserUrl}/profundidad/obtener-profundidad/por-medida/${id}`);
  }

  public actualizarEditable(){
    return this.http.get(`${baserUrl}/profundidad/actualizar-editable`); 
  }
}