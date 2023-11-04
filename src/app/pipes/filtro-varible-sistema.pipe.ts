import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVaribleSistema'
})
export class FiltroVaribleSistemaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.codigoVariable.toUpperCase().includes( search.toUpperCase())
                                      || ar.nombreVariable.toUpperCase().includes( search.toUpperCase())
                                      || ar.tipoVariable.nombreTipoVariable.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }
}
