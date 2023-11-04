import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProvincia'
})
export class FiltroProvinciaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}
    const datos = array.filter( ar => ar.codigoProvincia.toUpperCase().includes( search.toUpperCase()) ||
                                      ar.nombreProvincia.toUpperCase().includes( search.toUpperCase()));
    return datos;
  }
}
