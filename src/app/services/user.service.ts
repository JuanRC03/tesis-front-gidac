import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

    public editarPerfil(formData: any){
    
      return this.httpClient.post(`${baserUrl}/editar-perfil`,formData);
    } 

    public aniadirUsuario(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }

    public obtenerUsuario(id:any){
      return this.httpClient.get(`${baserUrl}/usuarios/${id}`);
    }

    public obtenerUsuarioID(idUsuario:any){
      return this.httpClient.get(`${baserUrl}/usuarios/id-usuario/${idUsuario}`);
    }

    public obtenerUsuarioRol(idRol:any){
      return this.httpClient.get(`${baserUrl}/usuarios/usuario-rol/${idRol}`);
    }

    public obtenerUsuarioRolEliminado(idRol:any){
      return this.httpClient.get(`${baserUrl}/usuarios/usuario-rol/eliminado/${idRol}`);
    }

    public listarInvestigadorNoAsignados(id:any){
      return this.httpClient.get(`${baserUrl}/usuarios/buscar-investigador-no-asignado/${id}`);
    }

   
    public restaurarUsuario(idUsuario:any){
      return this.httpClient.get(`${baserUrl}/usuarios/restaurar-usuario/${idUsuario}`);
    }
    
    
       

    /*
    public editarUsuario(user:any, file: File) {
      
      const formData = new FormData();
      
      formData.append('file', file);

      const formDataFinal = new FormData();
      formDataFinal.append('usuario', JSON.stringify(user));
      formDataFinal.append('file', file);

      return this.httpClient.put(`${baserUrl}/usuarios/`,formDataFinal);
    }*/


    //actualizar perfil en uso
  public editarUsuario(user:any){
    return this.httpClient.put(`${baserUrl}/usuarios/actual/`,user);
  }     

    public eliminarUsuario(idUsuario:any){
      return this.httpClient.delete(`${baserUrl}/usuarios/${idUsuario}`); 
    }

    public eliminarUsuarioInvestigador(idUsuario:any, idProyectoInvestigacion:any){
      return this.httpClient.delete(`${baserUrl}/usuarios/${idUsuario}`); 
    }

    public listarUsuariosNormales(){
      return this.httpClient.get(`${baserUrl}/usuarios/lista-normal`);
    }

    public getImagen(id:any){
      return this.httpClient.get(`${baserUrl}/usuarios/${id}/imagen`,{ responseType: 'blob' });
    }


    

    /*
    public editarUsuario(user:any) {

      return this.httpClient.put(`${baserUrl}/usuarios/`,user);
    }*/

}
