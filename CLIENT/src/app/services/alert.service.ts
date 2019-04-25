import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/dist/sweetalert2.min.css';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  test() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      type: 'error',
      confirmButtonText: 'Cool'
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
