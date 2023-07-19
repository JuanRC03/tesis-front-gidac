import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGrupoInvestigacion'
})
export class FiltroGrupoInvestigacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    /*const datos = array.filter( ar => ar.nombre.toUpperCase().includes( search.toUpperCase()) || ar.apellido.toUpperCase().includes( search.toUpperCase())
    || ar.email.toUpperCase().includes( search.toUpperCase()) || ar.telefono.toUpperCase().includes( search.toUpperCase())|| ar.cedula.includes( search));*/

    const datos = array.filter( ar => ar.usuario.nombreUsuario.toUpperCase().includes( search.toUpperCase()) || ar.usuario.apellidoUsuario.toUpperCase().includes( search.toUpperCase()) ||
    ar.usuario.email.toUpperCase().includes( search.toUpperCase()) || ar.usuario.cedula.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }
}
