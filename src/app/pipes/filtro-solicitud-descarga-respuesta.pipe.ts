import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSolicitudDescargaRespuesta'
})
export class FiltroSolicitudDescargaRespuestaPipe implements PipeTransform {
 
  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.solicitudDescarga.nombre.toUpperCase().includes( search.toUpperCase())
                        || (ar.solicitudDescarga.apellido.toUpperCase().includes( search.toUpperCase())) 
                        || (ar.solicitudDescarga.email.toUpperCase().includes( search.toUpperCase()))
                        || (ar.solicitudDescarga.institucion.toUpperCase().includes( search.toUpperCase())) 
                        );
   
    return datos;
  }

}
