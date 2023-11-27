import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/medida/guardar-medida`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/medida/actualizar-medida`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/medida/obtener-medida/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/medida/listar-medida`);
  }

  public listarEliminads(){
    return this.http.get(`${baserUrl}/medida/listar-medida-eliminado`);
  }

  public restaurar(id:any){
    return this.http.delete(`${baserUrl}/medida/restaurar-medida/${id}`); 
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/medida/eliminar-medida/${id}`); 
  }


  public actualizarEditable(){
    return this.http.get(`${baserUrl}/medida/actualizar-editable`); 
  }

  
}
