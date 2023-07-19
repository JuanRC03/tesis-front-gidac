import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InvestigadorService {

  constructor(private http:HttpClient) { }
  
  public listarInvestigador(id:any){
    return this.http.get(`${baserUrl}/usuarios/buscar-investigador-no-asignado/${id}`);
  }

}
