import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(value: {pending: number, show: number, noshow: number}, args:any): string {
    if (value == null || value.show == 0 && value.noshow == 0) return null;
    if (value.show == 0) return `<span class="text-danger">${value.noshow} No shows</span>`;
    if (value.noshow == 0) return `<span class="text-navy">${value.show} Shows</span>`;
    return `<span class="text-navy">${value.show} Shows</span> - <span class="text-danger">${value.noshow} No shows</span>`
  }
}
