import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from './reservation';

const classurl = 'http://localhost:3000/SERVER/index.php/api/v0/class';

interface apiResponse<T> {
  success: boolean,
  code: string,
  data: T
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true // for using cookie (important)
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getFromClass(id:number): Observable<Reservation[]> {
    return this.http.get<apiResponse<Reservation[]>>(`${classurl}/${id}/reserves`).pipe(
      map(x=>x.data)
    )
  }

  createToClass(id:number, term:Reservation): Observable<Reservation> {
    return this.http.post<apiResponse<Reservation>>(`${classurl}/${id}/reserves`, term, httpOptions).pipe(
      map(x=>x.data)
    )
  }

  getById(id:number): Observable<Reservation> {
    return this.http.get<apiResponse<Reservation>>(`${classurl}/${id}`).pipe(
      map(x=>x.data)
    )
  }

  delete(id:number): Observable<any> {
    return this.http.delete<apiResponse<any>>(`${classurl}/${id}`).pipe(
      map(x=>x.data)
    )
  }
}
