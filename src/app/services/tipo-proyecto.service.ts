import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {

  

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/tipo-proyecto/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/tipo-proyecto/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/tipo-proyecto/obtener/${id}`);
  }


  public listarVigentes(){
    return this.http.get(`${baserUrl}/tipo-proyecto/listar-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/tipo-proyecto/listar-eliminados`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/tipo-proyecto/eliminar/${id}`); 
  }

  public restablecer(id:any){
    return this.http.get(`${baserUrl}/tipo-proyecto/restablecer/${id}`);
  }
}
