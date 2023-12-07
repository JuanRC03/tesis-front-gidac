import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EmailEnvioService {

  constructor(private http:HttpClient) { }


  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/email-envio/save`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/email-envio/update`,modelo);
  }
  
  public findAll(){
    return this.http.get(`${baserUrl}/email-envio/findAll`);
  }

  public findById(id:any){
    return this.http.get(`${baserUrl}/email-envio/findById/${id}`);
  }

  public cambiarEstado(id:any){
    return this.http.get(`${baserUrl}/email-envio/cambiarEstado/${id}`);
  }

  public findByVigenciaTrueUno(){
    return this.http.get(`${baserUrl}/email-envio/findByVigenciaTrueUno`);
  }

  public findByVigenciaTrue(){
    return this.http.get(`${baserUrl}/email-envio/findByVigenciaTrue`);
  }

  public findByVigenciaFalse(){
    return this.http.get(`${baserUrl}/email-envio/findByVigenciaFalse`);
  }

  public delete(id:any){
    return this.http.delete(`${baserUrl}/email-envio/delete/${id}`);
  }

  public restore(id:any){
    return this.http.delete(`${baserUrl}/email-envio/restore/${id}`);
  }

}