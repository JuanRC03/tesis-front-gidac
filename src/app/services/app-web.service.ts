import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AppWebService {

  constructor(private http:HttpClient) { }


  public actualizarInformacionAppWeb(InformacionAppWeb:any){
    return this.http.post(`${baserUrl}/app-web/guardar-informacion-app-web`,InformacionAppWeb);
  }
  
  public listarInformacionAppWeb(){
    return this.http.get(`${baserUrl}/app-web/mostrar-informacion-app-web`);
  }

  public mostrarInformacionAppWebVigente(){
    return this.http.get(`${baserUrl}/app-web/mostrar-informacion-app-web-vigente`);
  }

  public getInformacionAppWeb(id:any){
    return this.http.get(`${baserUrl}/app-web/obtener-informacion-app-web/${id}`);
  }
}
