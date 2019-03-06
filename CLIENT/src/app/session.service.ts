import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ Session } from './session';

let session: Session;
const sessionurl: string = 'api/session';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  
  getSession():Observable<Session>{
    return this.http.get<Session>(sessionurl);
  }
  login(email:string, password: string):Observable<any> {
    return this.http.post<any>(sessionurl, {password, email}, httpOptions);
  }
  logout(id:number):Observable<Session> {
    return this.http.delete<Session>(sessionurl, httpOptions);
  }
}
