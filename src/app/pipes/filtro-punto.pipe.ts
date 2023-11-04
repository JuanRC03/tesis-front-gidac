import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPunto'
})
export class FiltroPuntoPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}
    const datos = array.filter( ar => ar.profundidadParcela.profundidad.profundidadMinima == search
                                   || ar.profundidadParcela.profundidad.profundidadMaxima == search
                                   || ar.profundidadParcela.profundidad.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase()));
    return datos;
  }
}
