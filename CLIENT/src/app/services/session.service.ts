import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{ Session } from '../interfaces/session';
import { APIService } from './API.service';

const sessionurl: string = 'http://localhost:3000/SERVER/index.php/api/v0/session';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private apiservice: APIService) { }
  
  getSession():Observable<Session> {
    return this.apiservice.get(sessionurl);
  }

  login(email:string, password: string):Observable<Session> {
    return this.apiservice.post(sessionurl, {password, email});
  }

  logout():Observable<Session> {
    return this.apiservice.delete(sessionurl);
  }
}
