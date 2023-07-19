import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/pais/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/pais/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/pais/obtener/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/pais/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/pais/eliminar/${id}`); 
  }
}
