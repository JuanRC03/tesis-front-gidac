import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitucionParticipanteService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/institucion-participante/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/institucion-participante/actualizar`,modelo);
  }

  public listar(){
    return this.http.get(`${baserUrl}/institucion-participante/listar`);
  }
}
