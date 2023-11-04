import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSolicitudActualizarRespuesta'
})
export class FiltroSolicitudActualizarRespuestaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.solicitudActualizarDato.grupoInvestigacion.usuario.cedula.toUpperCase().includes( search.toUpperCase()) 
                                  || ar.solicitudActualizarDato.grupoInvestigacion.usuario.nombreUsuario.toUpperCase().includes( search.toUpperCase())
                                  || ar.solicitudActualizarDato.grupoInvestigacion.usuario.apellidoUsuario.toUpperCase().includes( search.toUpperCase()) 
                                  || ar.solicitudActualizarDato.grupoInvestigacion.usuario.email.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
