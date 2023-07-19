import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarbonoService {

  constructor(private http:HttpClient) { }

  public listarInvestigacionesId(Id:any){
    return this.http.get(`${baserUrl}/api/carbonoInvestigacion/${Id}`);
  }

  public listarCarbonoDisponibleInvestigacionesPublicas(Id:any){
    return this.http.get(`${baserUrl}/api/carbonoDisponibleInvestigacionPublica/${Id}`);
  }

  public listarCarbono(){
    return this.http.get(`${baserUrl}/api/carbono`);
  }

  public getCarbono(idCarbono:any){
    return this.http.get(`${baserUrl}/api/carbono/${idCarbono}`);
  }

  public agregarCarbono(carbono:any){
    return this.http.post(`${baserUrl}/api/carbonoETL`,carbono);
  }

  public eliminarCarbono(Id:any){
    return this.http.delete(`${baserUrl}/api/carbono/${Id}`);
  }
}
