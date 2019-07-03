import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
//import 'sweetalert2/dist/sweetalert2.min.css';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirm(title: string, text: string, confirmValue: string = 'Continue', cancelValue: string = 'Cancel'): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF942F',
      cancelButtonColor: '#FF942F',
      confirmButtonText: confirmValue,
      cancelButtonText: cancelValue,
    }).then(v => {
      if ('value' in v) return v.value;
      return false;
    });
  }

  success(message:string) {
    Swal.fire({
      title: 'Success!',
      text: message,
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

  warn(message:string) {
    Swal.fire({
      title: 'Warn!',
      text: message,
      type: 'warning',
      confirmButtonText: 'OK'
    });
  }

  error(message:string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      type: 'error',
      confirmButtonText: 'OK'
    });
  }
}
