import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import{ Session } from './session';

interface apiResponse<T> {
  success: boolean,
  code: string,
  data: T
}

let session: Session;
const sessionurl: string = 'http://localhost:3000/SERVER/index.php/api/v0/session';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true // for using cookie (important)
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  
  getSession():Observable<Session> {
    return this.http.get<apiResponse<Session>>(sessionurl).pipe(
      map((x)=> x.data)
    );
  }

  login(email:string, password: string):Observable<Session> {
    return this.http.post<apiResponse<Session>>(sessionurl, {password, email}, httpOptions).pipe(
      map((x)=> x.data)
    );
  }

  logout():Observable<Session> {
    return this.http.delete<apiResponse<Session>>(sessionurl, httpOptions).pipe(
      map((x:apiResponse<Session>)=> x.data)
    );
  }
}
