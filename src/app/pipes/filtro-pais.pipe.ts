import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPais'
})
export class FiltroPaisPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}
    const datos = array.filter( ar => ar.codigoPais.toUpperCase().includes( search.toUpperCase()) ||
                                      ar.nombrePais.toUpperCase().includes( search.toUpperCase()) );
    return datos;
  }
}
