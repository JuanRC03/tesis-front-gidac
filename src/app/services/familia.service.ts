import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/familia/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/familia/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/familia/obtener/${id}`);
  }

  public listarVigentes(){
    return this.http.get(`${baserUrl}/familia/listar-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/familia/listar-eliminados`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/familia/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/familia/eliminar/${id}`); 
  }

  public listarPorFamilia(id:any){
    return this.http.get(`${baserUrl}/familia/buscar-familias/${id}`);
  }

  public listarHijosFinales(id:any){
    return this.http.get(`${baserUrl}/familia/hijos-finales`);
  }

  public listarHijosRecursivos(id:any){
    return this.http.get(`${baserUrl}/familia/listar-por-categoria/${id}`);
  }

  public listarPadreAux(id:any){
    return this.http.get(`${baserUrl}/familia/listar-por-id-aux/${id}`);
  }

  public actualizarFamiliasVariable(modelo:any){
    return this.http.post(`${baserUrl}/variable-familia/actualizar-familia`,modelo);
  }

  
  public listarFamiliasSeleccionadasPorVariable(idVariable:any){
    return this.http.get(`${baserUrl}/variable-familia/listar-familia-por-variable/${idVariable}`); 
  }  

  getHijosFinales(): Observable<FamiliaDTO[]> {
    return this.http.get<FamiliaDTO[]>(`${baserUrl}/familia/hijos-finales`);
  }
}

export interface FamiliaDTO {
  idFamilia: number;
  descripcion: string;
  descripcionCompleta: string;
  checked: boolean;
}