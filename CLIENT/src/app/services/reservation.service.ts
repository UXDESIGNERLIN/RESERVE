import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { APIService } from './API.service';
import { tap } from 'rxjs/operators'; 

const classurl = 'class';
const reserveurl = 'reserve'


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private apiservice: APIService) { }

  getFromClass(classId: string): Observable<Reservation[]> {
    return this.apiservice.get(`${classurl}/${classId}/reserves`);
  }

  /*
  createToClass(classId:number, term:Reservation): Observable<Reservation> {
    return this.apiservice.post<Reservation>(`${classurl}/${classId}/reserves`, term).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${classurl}/${classId}/reserves`);
        }
       )
    );
  }
  */

  getById(id: string): Observable<Reservation> {
    return this.apiservice.get(`${reserveurl}/${id}`);
  }

  // Used to manually update confirmation on the backoffice
  updateConfirmation(id: string, confirmation: string): Observable<void> {
    return this.apiservice.put(`${reserveurl}/${id}`, {confirmation});
  }

  delete(id: string): Observable<any> {
    return this.apiservice.delete(`${reserveurl}/${id}`).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${reserveurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${classurl}/`, true);
        }
      )
    );
  }
}
