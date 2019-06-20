import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reqIcon'
})
export class ReqIconPipe implements PipeTransform {

/*  
  transform(value: string[], args:any): string[] {
//let result: number[];
    let n: string[];
    return n = value.map( (info)=> {
     switch(info) {
        case 'email': return '<i class="fas fa-envelope" title="email" ></i>';
        case 'phone': return '<i class="fas fa-phone" title="phone"></i>';
        case 'fname': return '<i class="fas fa-font" title="full name"></i>';
        case 'gender': return '<i class="fas fa-venus-mars" title="gender"></i>';
        case 'age': return '<i class="fas fa-birthday-cake" title="age"></i>';
        
      }

    });

  }
  */
  transform(value: string[], args:any): string {
  //let result: number[];
    let n: string[];
    n = value.map( (info)=> {
      switch(info) {
        case 'email': return '<i class="fas fa-envelope" title="email"></i>';
        case 'phone': return '<i class="fas fa-phone" title="phone"></i>';
        case 'fname': return '<i class="fas fa-font" title="full name"></i>';
        case 'gender': return '<i class="fas fa-venus-mars" title="gender"></i>';
        case 'age': return '<i class="fas fa-birthday-cake" title="age"></i>';
        
      }
    })

    return n.join("    ");
  

  }
 



}
