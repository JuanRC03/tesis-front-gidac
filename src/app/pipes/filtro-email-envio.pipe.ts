import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmailEnvio'
})
export class FiltroEmailEnvioPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.email.toUpperCase().includes( search.toUpperCase())
                                   || ar.host.toUpperCase().includes( search.toUpperCase())
                                   || ar.port.includes( search));
   
    return datos;
  }

}
