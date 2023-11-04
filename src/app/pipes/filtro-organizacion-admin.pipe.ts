import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroOrganizacionAdmin'
})
export class FiltroOrganizacionAdminPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.siglas.toUpperCase().includes( search.toUpperCase())|| ar.nombreOrganizacion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
