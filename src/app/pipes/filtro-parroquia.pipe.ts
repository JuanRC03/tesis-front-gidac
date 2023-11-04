import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroParroquia'
})
export class FiltroParroquiaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}
    const datos = array.filter( ar => ar.codigoParroquia.toUpperCase().includes( search.toUpperCase()) ||
                                      ar.nombreParroquia.toUpperCase().includes( search.toUpperCase()));
    return datos;
  }
}
