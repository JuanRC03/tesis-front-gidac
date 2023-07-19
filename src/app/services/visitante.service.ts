import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  constructor(private http:HttpClient) { }

  public listarVisitante(){
    return this.http.get(`${baserUrl}/listarVisitante`);
  }

  public agregarVisitante(visitante:any){
    return this.http.post(`${baserUrl}/guardarVisitante`,visitante);
  }

  public getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }
}
