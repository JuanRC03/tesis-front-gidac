import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroInvestigacion'
})
export class FiltroInvestigacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreProyecto.toUpperCase().includes( search.toUpperCase()) || ar.descripcion.toUpperCase().includes( search.toUpperCase())
     
    );
   
    return datos;
  }

}
