import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/dist/sweetalert2.min.css';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirm(title: string, text: string, confirmValue: string = 'Continue', cancelValue: string = 'Cancel'): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      Swal.fire({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d7122b', //#3085d6',
        cancelButtonColor: '#d7122b', //'#d33',
        confirmButtonText: confirmValue,
        cancelButtonText: cancelValue,
      },
      function (isConfirm: boolean) {
        resolve(isConfirm);
      });
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
