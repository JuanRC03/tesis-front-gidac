import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProfundidad'
})
export class FiltroProfundidadPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.profundidadMinima==search
                                   || ar.profundidadMaxima==search
                                   || ar.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase())
                                   || ar.unidadMedida.unidadMedida.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
