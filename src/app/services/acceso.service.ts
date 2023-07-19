import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(private http:HttpClient) { }


  public guardarAcceso(acceso:any){
    return this.http.post(`${baserUrl}/acceso/guardar-acceso`,acceso);
  }
  
  public listarAccesoAdministrador(){
    return this.http.get(`${baserUrl}/acceso/listar-accesos-administrador`);
  }

  public listarAccesoDirector(){
    return this.http.get(`${baserUrl}/acceso/listar-accesos-director`);
  }

  public listarAccesoInvestigador(){
    return this.http.get(`${baserUrl}/acceso/listar-accesos-investigador`);
  }

  public listarAcceso(){
    return this.http.get(`${baserUrl}/acceso/listar-accesos`);
  }

  public obtenerAcceso(id:any){
    return this.http.get(`${baserUrl}/acceso/obtener-acceso/${id}`);
  }
}