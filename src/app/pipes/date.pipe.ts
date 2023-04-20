import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns'


@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: unknown, formatDate: string = 'dd-MM-yyyy'): unknown {    
    if(typeof value == 'string' && value != '') {
      return format(new Date(value), formatDate)
    }
    return value;
  }

}
