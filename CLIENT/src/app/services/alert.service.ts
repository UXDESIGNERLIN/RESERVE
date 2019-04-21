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
}
