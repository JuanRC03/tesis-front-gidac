import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFamiliaAdmin'
})
export class FiltroFamiliaAdminPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.codigo.toUpperCase().includes( search.toUpperCase())|| ar.descripcion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
