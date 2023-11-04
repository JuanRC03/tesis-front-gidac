import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/guardar-ubicacion`,modelo);
  }

  //------------------------------------------------------------------------
  //Guardar

  public guardarPais(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/guardar-pais`,modelo);
  }

  public guardarProvincia(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/guardar-provincia`,modelo);
  }

  public guardarCanton(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/guardar-canton`,modelo);
  }

  public guardarParroquia(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/guardar-parroquia`,modelo);
  }

  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  //Guardar

  public actualizarPais(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/actualizar-pais`,modelo);
  }

  public actualizarProvincia(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/actualizar-provincia`,modelo);
  }

  public actualizarCanton(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/actualizar-canton`,modelo);
  }

  public actualizarParroquia(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/actualizar-parroquia`,modelo);
  }

  //------------------------------------------------------------------------
  //Eliminar

  public eliminarPaises(idPais:any){
    return this.http.delete(`${baserUrl}/ubicacion/eliminar-paises/${idPais}`); 
  }

  public eliminarProvincias(idPais:any,idProvincia:any){
    return this.http.delete(`${baserUrl}/ubicacion/eliminar-provincias/${idPais}/${idProvincia}`); 
  }

  public eliminarCantones(idPais:any,idProvincia:any,idCanton:any){
    return this.http.delete(`${baserUrl}/ubicacion/eliminar-cantones/${idPais}/${idProvincia}/${idCanton}`); 
  }

  public eliminarParroquia(idPais:any,idProvincia:any,idCanton:any,idParroquia:any){
    return this.http.delete(`${baserUrl}/ubicacion/eliminar-parroquias/${idPais}/${idProvincia}/${idCanton}/${idParroquia}`); 
  }

  //------------------------------------------------------------------------
  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/ubicacion/guardar-ubicacion`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/${id}`);
  }

  public listarVigente(){
    return this.http.get(`${baserUrl}/ubicacion/listar-ubicacion-vigente`);
  }

  public listarEliminado(){
    return this.http.get(`${baserUrl}/ubicacion/listar-ubicacion-eliminado`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/ubicacion/eliminar-ubicacion/${id}`); 
  }

  public obtenerPorPais(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-pais/${id}`);
  }

  public obtenerPorProvincia(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-provincia/${id}`);
  }

  public obtenerPorCanton(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-canton/${id}`);
  }

  public obtenerPorParroquia(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-parroquia/${id}`);
  }



  public obtenerPaises(){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-paises`);
  }


  public obtenerProvincias(idPais:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-provincias/${idPais}`);
  }

  public obtenerCantones(idPais:any, idProv:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-cantones/${idPais}/${idProv}`);
  }

  public obtenerParroquias(idPais:any, idProv:any, idCanton:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-parroquias/${idPais}/${idProv}/${idCanton}`);
  }

}
