import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatoRecolectadoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/dato-recolectado/guardar-dato-recolectado`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/dato-recolectado/actualizar-dato-recolectado`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/obtener-dato-recolectado/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-dato-recolectado`);
  }

  public listarPorProyecto(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-dato-recolectado/por-proyecto/${id}`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/dato-recolectado/eliminar-dato-recolectado/${id}`); 
  }

  public obtenerPorDataset(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/obtener-por-dataset/${id}`);
  }

  public obtenerPorProfundidadParcela(idProfundidad:any, idParcela:any){
    return this.http.get(`${baserUrl}/dato-recolectado/obtener-por-profundidad-parcela/${idProfundidad}/${idParcela}`);
  }

  public comprobarXLS(modelo:any){
    return this.http.post(`${baserUrl}/dato-recolectado/comprobar-estado-archivo`,modelo);
  }

  public guardarXLS(modelo:any){
    return this.http.post(`${baserUrl}/dato-recolectado/registrar-datos-xls`,modelo);
  }

  public variablesDeXLS(modelo:any){
    return this.http.post(`${baserUrl}/dato-recolectado/buscar-datos-para-perfilado`,modelo);
  }

  public perfilarXLS(modelo:any){
    return this.http.post(`${baserUrl}/dato-recolectado/perfilar-datos`,modelo);
  }

  
  public colorizarArchivo(modelo: FormData): Observable<Blob> {
    return this.http.post(`${baserUrl}/dato-recolectado/colorizar-archivo`, modelo, { responseType: 'blob' });
  }

  public colorizarArchivoEditado(modelo: any): Observable<Blob> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
//    return this.http.post(`${baserUrl}/dato-recolectado/colorizar-archivo-editado`, modelo, { responseType: 'blob' });

    return this.http.post(`${baserUrl}/dato-recolectado/colorizar-archivo-editado`, modelo, {
      headers,
      responseType: 'blob'
    });
  }

  public modificarArchivo(modelo: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${baserUrl}/dato-recolectado/modificarArchivo`, modelo, { headers: headers, responseType: 'blob' as 'json' });
  }

  cambiarColorArchivo(modelo: any): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`${baserUrl}/dato-recolectado-archivo/cambiar-color`, modelo, {
      headers,
      responseType: 'blob' as 'json' // Establecer el tipo de respuesta como blob
    });

  }

  public unirDatos(modelo:any){
    return this.http.post(`${baserUrl}/dato-recolectado/unir-datos`,modelo);
  }

  public actualizarEditable(){
    return this.http.get(`${baserUrl}/dato-recolectado/actualizar-editables`);
  }

  public listarTodosLosDatos(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos/${id}`);
  }

  public listarTodosLosDatosUnidos(id:any, idVariable:any, codigoDataset:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-unidos/${id}/${idVariable}/${codigoDataset}`);
  }

  public listarTodosLosDatosCatalogoUnidos(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-catalogo-unidos/${id}`);
  }

  public listarTodosLosDatosCatalogo(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-catalogo/${id}`);
  }

  public dashlistarTodosLosDatosProyectoVariable(idProyecto:any, idVariable:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-proyecto-variable/${idProyecto}/${idVariable}`);
  }

  public listarTodosLosDatosNominal(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-nominal/${id}`);
  }

  public listarTodosLosDatosCatalogoNominal(id:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-catalogo-nominal/${id}`);
  }
  
  public dashlistarTodosLosDatosProyectoVariableNominal(idProyecto:any, idVariable:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-proyecto-variable-nominal/${idProyecto}/${idVariable}`);
  }

  public dashlistarTodosLosDatosProyectoVariableUnido(idProyecto:any, idVariable:any, codigoDataset:any){
    return this.http.get(`${baserUrl}/dato-recolectado/listar-todos-datos-proyecto-variable-unidos/${idProyecto}/${idVariable}/${codigoDataset}`);
  }

}
