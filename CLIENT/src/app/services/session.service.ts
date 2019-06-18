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

  public redirectUrl: string = null;// share the info with auth guard

  constructor(
    private apiservice: APIService,
  ) { }

  getSession(): Observable<Session> {
    return this.apiservice.get(sessionurl);
  }

  login(email: string, password: string): Observable<Session> {
    return this.apiservice.post<Session>(sessionurl, { password, email }); // We clean the cache in the POST method from APIService
  }

  logout(): Observable<Session> {
    return this.apiservice.delete<Session>(sessionurl).pipe(
      tap(() => {
        this.apiservice.EraseCache();
        this.redirectUrl = null;
      }),
    );
  }
}
