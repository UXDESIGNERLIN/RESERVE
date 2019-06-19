import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reqIcon'
})
export class ReqIconPipe implements PipeTransform {

  
  transform(value: string[], args:any): string[] {
//let result: number[];
    let n: string[];
    return n = value.map( (info)=> {
     switch(info) {
        case 'email': return '<i class="fas fa-envelope"></i>';
        case 'phone': return "fas fa-phone";
        case 'fname': return "fas fa-font";
        case 'gender': return "fas fa-venus-mars";
        case 'age': return "fas fa-envelope";
        
      }

    });
  
  }
 



}
