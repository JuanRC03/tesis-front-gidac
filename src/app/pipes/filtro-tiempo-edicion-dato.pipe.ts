import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTiempoEdicionDato'
})
export class FiltroTiempoEdicionDatoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
