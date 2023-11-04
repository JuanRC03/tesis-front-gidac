import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/organizacion/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/organizacion/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/organizacion/obtener/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/organizacion/listar`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/organizacion/listar-eliminados`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/organizacion/eliminar/${id}`); 
  }

  public restablecer(id:any){
    return this.http.delete(`${baserUrl}/organizacion/reestablecer/${id}`); 
  }
}
