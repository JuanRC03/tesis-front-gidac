import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariableUnidadMedidaService {

  constructor(private http:HttpClient) { }

  public listar(){
    return this.http.get(`${baserUrl}/unidad-medida-variable/listar`);
  }

}
