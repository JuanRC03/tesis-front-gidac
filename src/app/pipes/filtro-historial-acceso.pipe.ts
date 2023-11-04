import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroHistorialAcceso'
})
export class FiltroHistorialAccesoPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.usuario.nombreUsuario.toUpperCase().includes( search.toUpperCase())
                                      || ar.usuario.apellidoUsuario.toUpperCase().includes( search.toUpperCase())
                                      || ar.usuario.cedula.toUpperCase().includes( search.toUpperCase())
                                      || ar.usuario.email.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
