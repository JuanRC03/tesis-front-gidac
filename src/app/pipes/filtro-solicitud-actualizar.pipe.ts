import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSolicitudActualizar'
})
export class FiltroSolicitudActualizarPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.grupoInvestigacion.usuario.cedula.toUpperCase().includes( search.toUpperCase()) 
                                  || ar.grupoInvestigacion.usuario.nombreUsuario.toUpperCase().includes( search.toUpperCase())
                                  || ar.grupoInvestigacion.usuario.apellidoUsuario.toUpperCase().includes( search.toUpperCase()) 
                                  || ar.grupoInvestigacion.usuario.email.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
