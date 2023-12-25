import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InvestigacionInvestigadoresService {

  constructor(private http:HttpClient) { }

  public listarInvestigadoresEnProyectosInvestigacion(id:any){
    return this.http.get(`${baserUrl}/api/lista-investigadores-en-proyectors-investigacion/${id}`);
  }

  public guardarGrupoDeInvestigacion(investigacionInvestigador:any){
    return this.http.post(`${baserUrl}/api/investigacion-investigador`,investigacionInvestigador);
  }

  public eliminarInvestigadorDeProyectoInvestigacion(investigacionInvestigador:any){
    return this.http.post(`${baserUrl}/api/eliminar-investigador-de-proyecto-investigacion`,investigacionInvestigador);
  }
  public listarInvestigacionInvestigador(id:any){
    return this.http.get(`${baserUrl}/api/lista-investigacion-investigador/${id}`);
  }
  public getInvestigacionInvestigador(id:any){
    return this.http.get(`${baserUrl}/api/investigacion-investigador/${id}`);
  }

  public obtenerProyectoVigentesDirector(id:any){
    return this.http.get(`${baserUrl}/api/investigacion-vigentes-director/${id}`);
  }
  public obtenerProyectoEliminadosDirector(id:any){
    return this.http.get(`${baserUrl}/api/investigacion-eliminados-director/${id}`);
  }

  public obtenerDirectorProyecto(id:any){
    return this.http.get(`${baserUrl}/api/listar-director-proyecto/${id}`);
  }

  
}
