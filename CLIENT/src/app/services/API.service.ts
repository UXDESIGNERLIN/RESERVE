import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface apiResponse<T> {
  success: boolean,
  code: string,
  data: T
}

const base_url = `https://api.myspotbook.com/api/v0/`;
 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true // for using cookie (important)
};

@Injectable({
  providedIn: 'root'
})
export class APIService {
  // pending requests handling //
  static pending: number = 0; 
  
  constructor(private http: HttpClient) { }

  get<T>(url:string): Observable<T> {
    setTimeout(()=>APIService.pending++,0);
    return this.http.get<apiResponse<T>>(`${base_url}${url}`, httpOptions).pipe(
      tap(() => APIService.pending--),
      map(x=>x.data)
    );
    
  }

  post<T>(url:string, term:any): Observable<T> {
    APIService.pending++;
    return this.http.post<apiResponse<T>>(`${base_url}${url}`, term, httpOptions).pipe(
      tap(() => APIService.pending--),
      map(x=>x.data),
    );
  }

  put<T>(url:string, term:any): Observable<T> {
    APIService.pending++;
    return this.http.put<apiResponse<T>>(`${base_url}${url}`, term, httpOptions).pipe(
      tap(() => APIService.pending--),
      map(x=>x.data)
    );
  }

  delete<T>(url:string): Observable<T> {
    APIService.pending++;
    return this.http.delete<apiResponse<T>>(`${base_url}${url}`, httpOptions).pipe(
      tap(() => APIService.pending--),
      map(x=>x.data)
    );
  }


}
