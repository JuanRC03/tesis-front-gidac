import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEquivalencia'
})
export class FiltroEquivalenciaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreVariable.toUpperCase().includes( search.toUpperCase())
                                   || ar.nombreVariableOrganizacion.toUpperCase().includes( search.toUpperCase())
                                   || ar.nombreOrganizacion.toUpperCase().includes( search.toUpperCase())
                                   || ar.nombreTipoVariable.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
