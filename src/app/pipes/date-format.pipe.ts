import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Crear una instancia de DatePipe para formatear la fecha
    const datePipe = new DatePipe('en-US');

    // Formatear la fecha en el formato 'dd/MM/yyyy'
    const formattedDate = datePipe.transform(value, 'dd/MM/yyyy');

    return formattedDate || value;
  }
}
