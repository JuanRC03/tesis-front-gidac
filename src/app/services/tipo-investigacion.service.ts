import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoInvestigacionService {

  

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/tipo-investigacion/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/tipo-investigacion/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/tipo-investigacion/obtener/${id}`);
  }

  public listarVigentes(){
    return this.http.get(`${baserUrl}/tipo-investigacion/listar-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/tipo-investigacion/listar-eliminados`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/tipo-investigacion/eliminar/${id}`); 
  }
  public restablecer(id:any){
    return this.http.get(`${baserUrl}/tipo-investigacion/restablecer/${id}`);
  }
}
