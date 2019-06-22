import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  transform(value: string, args:any): string {
  
    return (value != null) ? value : `<i title="not available">n.a.</i>` 
  }
}
