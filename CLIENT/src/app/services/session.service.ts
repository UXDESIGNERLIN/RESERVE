import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Session } from '../interfaces/session';
import { APIService } from './API.service';

const sessionurl: string = 'session';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private apiservice: APIService) { }

  getSession(): Observable<Session> {
    //console.log("pending of getsession:",this.apiservice.pending);
    return this.apiservice.get(sessionurl);
    //{"success":true,"code":"","data":{"loggedIn":true,"companyId":"5"}}
  }

  login(email: string, password: string): Observable<Session> {
    return this.apiservice.post<Session>(sessionurl, { password, email }).pipe(
      tap(() => this.apiservice.EraseCacheEntry('session'))
    )
  }

  logout(): Observable<Session> {
    
    return this.apiservice.delete<Session>(sessionurl).pipe(
      tap(() => this.apiservice.EraseCache())
    );
  }
}
