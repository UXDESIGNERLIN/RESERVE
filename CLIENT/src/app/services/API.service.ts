import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class APIService {

  constructor(private http: HttpClient) { }

  get<T>(url:string): Observable<T> {
    return this.http.get<apiResponse<T>>(url, httpOptions).pipe(
      map(x=>x.data)
    );
  }

  post<T>(url:string, term:any): Observable<T> {
    return this.http.post<apiResponse<T>>(url, term, httpOptions).pipe(
      map(x=>x.data)
    );
  }

  put<T>(url:string, term:any): Observable<T> {
    return this.http.put<apiResponse<T>>(url, term, httpOptions).pipe(
      map(x=>x.data)
    );
  }

  delete<T>(url:string): Observable<T> {
    return this.http.delete<apiResponse<T>>(url, httpOptions).pipe(
      map(x=>x.data)
    );
  }


}
