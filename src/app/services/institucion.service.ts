import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/institucion/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/institucion/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/institucion/obtener/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/institucion/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/institucion/eliminar/${id}`); 
  }
}
