import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/area/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/area/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/area/obtener/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/area/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/area/eliminar/${id}`); 
  }
}
