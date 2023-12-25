import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiempoEdicionDatoService {

  constructor(private http:HttpClient) { }


  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/tiempo-edicion-dato/save`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/tiempo-edicion-dato/update`,modelo);
  }
  
  public findAll(){
    return this.http.get(`${baserUrl}/tiempo-edicion-dato/findAll`);
  }

  public findById(id:any){
    return this.http.get(`${baserUrl}/tiempo-edicion-dato/findById/${id}`);
  }

  public findByVigenciaTrueUno(){
    return this.http.get(`${baserUrl}/tiempo-edicion-dato/findByVigenciaTrueUno`);
  }

  public findByVigenciaTrue(){
    return this.http.get(`${baserUrl}/tiempo-edicion-dato/findByVigenciaTrue`);
  }

  public findByVigenciaFalse(){
    return this.http.get(`${baserUrl}/tiempo-edicion-dato/findByVigenciaFalse`);
  }

  public delete(id:any){
    return this.http.delete(`${baserUrl}/tiempo-edicion-dato/delete/${id}`);
  }

  public restore(id:any){
    return this.http.delete(`${baserUrl}/tiempo-edicion-dato/restore/${id}`);
  }

}