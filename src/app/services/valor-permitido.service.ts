import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValorPermitidoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/valor-permitido/guardar-valor-permitido`,modelo);
  }

  public guardarValorPermitido(modelo:any){
    return this.http.post(`${baserUrl}/valor-permitido/guardar-datos-valor-permitodo`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/valor-permitido/guardar-valor-permitido`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/valor-permitido/obtener-valor-permitido/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/valor-permitido/listar-valor-permitido`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/valor-permitido/eliminar-valor-permitido/${id}`); 
  }

  public obtenerPorVariable(id:any){
    return this.http.get(`${baserUrl}/valor-permitido/listar-valor-permitido/por-variable/${id}`);
  }

  public listarPorVariable(id:any){
    return this.http.get(`${baserUrl}/valor-permitido/por-variable/${id}`);
  }
}