import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { APIService } from './API.service';

const classurl = 'http://localhost:3000/SERVER/index.php/api/v0/class';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private apiservice: APIService) { }

  getFromClass(id:number): Observable<Reservation[]> {
    return this.apiservice.get(`${classurl}/${id}/reserves`);
  }

  createToClass(id:number, term:Reservation): Observable<Reservation> {
    return this.apiservice.post(`${classurl}/${id}/reserves`, term);
  }

  getById(id:number): Observable<Reservation> {
    return this.apiservice.get(`${classurl}/${id}`);
  }

  delete(id:number): Observable<any> {
    return this.apiservice.delete(`${classurl}/${id}`);
  }
}
