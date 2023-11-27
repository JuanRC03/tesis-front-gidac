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

  public listarVigentes(){
    return this.http.get(`${baserUrl}/unidad-medida-variable/listar-equivalencia-variable-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/unidad-medida-variable/listar-equivalencia-variable-eliminados`);
  }

  public listarVigentesVariableVigente(){
    return this.http.get(`${baserUrl}/unidad-medida-variable/listar-equivalencia-variable-vigente-variable-vigente`);
  }

  public listarNoVigentesVariableNoVigente(){
    return this.http.get(`${baserUrl}/unidad-medida-variable/listar-equivalencia-variable-no-vigente-variable-no-vigente`);
  }

  

  

}
