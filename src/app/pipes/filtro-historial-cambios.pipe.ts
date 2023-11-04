import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroHistorialCambios'
})
export class FiltroHistorialCambiosPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.usuario.nombreUsuario.toUpperCase().includes( search.toUpperCase())
                                      || ar.usuario.nombreUsuario.toUpperCase().includes( search.toUpperCase())
                                      );
   
    return datos;
  }

}
