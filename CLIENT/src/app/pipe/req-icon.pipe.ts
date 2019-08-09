import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reqIcon'
})
export class ReqIconPipe implements PipeTransform {

  /*
  transform(value: string[], args:any): string {
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
  */
 transform(value: string[], args:any): string {
  return [
    { key: 'email', icon: 'fas fa-envelope', title: 'email' },
    { key: 'phone', icon: 'fas fa-phone', title: 'phone' },
    { key: 'fname', icon: 'fas fa-font', title: 'full name' },
    { key: 'gender', icon: 'fas fa-venus-mars', title: 'gender' },
    { key: 'age', icon: 'fas fa-birthday-cake', title: 'age' },
  ]
  .map((icons) => {
    return `<i class="${icons.icon} ${value.includes(icons.key) ? 'active-req' : 'inactive-req'}" title="${icons.title}"></i>`
  })
  .join('&nbsp;');
}



}
