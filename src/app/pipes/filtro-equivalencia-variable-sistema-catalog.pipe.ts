import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEquivalenciaVariableSistemaCatalog'
})
export class FiltroEquivalenciaVariableSistemaCatalogPipe implements PipeTransform {
  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.variable.nombreVariable.toUpperCase().includes( search.toUpperCase())
                                   || ar.nombreVariableOrganizacion.toUpperCase().includes( search.toUpperCase())
                                   || ar.organizacion.nombreOrganizacion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
