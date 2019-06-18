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
        case 'email': return "far fa-envelope";
        case 'phone': return "far fa-phone";
        case 'fname': return "far fa-font";
        case 'gender': return "far fa-venus-mars";
        case 'age': return "far fa-envelope";
        
      }

    });
   /* 
    switch(value) {
      case ['email']: return 1;
      case ['phone']: return 2;
      case ['fname']: return 3;
      case ['gender']: return 4;
      case ['age']: return 5;
     
    }
    */
  }

}
