import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSolicitudDescarga'
})
export class FiltroSolicitudDescargaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
