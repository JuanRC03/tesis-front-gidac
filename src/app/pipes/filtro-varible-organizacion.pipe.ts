import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVaribleOrganizacion'
})
export class FiltroVaribleOrganizacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.codigoVariableOrganizacion.toUpperCase().includes( search.toUpperCase())
                                || ar.nombreVariableOrganizacion.toUpperCase().includes( search.toUpperCase())
                                || ar.descripcion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
