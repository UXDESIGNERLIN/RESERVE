import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { APIService } from './API.service';

const classurl = 'class';
const reserveurl = 'reserve'


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private apiservice: APIService) { }

  getFromClass(classId:number): Observable<Reservation[]> {
    return this.apiservice.get(`${classurl}/${classId}/reserves`);
  }

  createToClass(classId:number, term:Reservation): Observable<Reservation> {
    return this.apiservice.post(`${classurl}/${classId}/reserves`, term);
  }

  getById(id:number): Observable<Reservation> {
    return this.apiservice.get(`${reserveurl}/${id}`);
  }

  delete(id:number): Observable<any> {
    return this.apiservice.delete(`${reserveurl}/${id}`);
  }
}
