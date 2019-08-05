import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(value: {pending: number, show: number, noshow: number}, args:any): string {
    if (value == null || value.show == 0 && value.noshow == 0) return null;
    if (value.show == 0) return `${value.noshow} No shows`;
    if (value.noshow == 0) return `${value.show} shows`;
    return `${value.show} shows - ${value.noshow} No shows`
  }
}
