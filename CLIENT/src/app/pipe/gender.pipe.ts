import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string, args:any): string {

    switch (value) {
      case 'm' :
      case 'M' :
        return 'Male';
      case 'f' :
      case 'F' :
        return 'Female';
      default :
        return value; 
    }
  }
}
