import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/familia/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/familia/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/familia/obtener/${id}`);
  }

  public listarVigentes(){
    return this.http.get(`${baserUrl}/familia/listar-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/familia/listar-eliminados`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/familia/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/familia/eliminar/${id}`); 
  }
}