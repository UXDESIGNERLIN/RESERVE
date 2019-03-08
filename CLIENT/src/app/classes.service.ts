import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Class } from './class';

const courseurl = "http://localhost:3000/SERVER/index.php/api/v0/course";

const classurl = "http://localhost:3000/SERVER/index.php/api/v0/class";

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
export class ClassesService {

  constructor(private http: HttpClient) { }

  getFromCourse(id:number): Observable<Class[]> {
    return this.http.get<apiResponse<Class[]>>(`${courseurl}/${id}/classes`).pipe(
      map((x)=>x.data)
    )
  }
  createToCourse(id:number, term:Class): Observable<Class> {
    return this.http.post<apiResponse<Class>>(`${courseurl}/${id}/classes`, term , httpOptions).pipe(
      map((x)=>x.data)
    )
  }

  getById(id:number): Observable<Class> {
    return this.http.get<apiResponse<Class>>(`${classurl}/${id}`).pipe(
      map(x=>x.data)
    )
  }

  update(id:number,term:Class): Observable<Class> {
    return this.http.put<apiResponse<Class>>(`${classurl}/${id}`,term, httpOptions).pipe(
      map(x=>x.data)
    )
  }

  delete(id:number): Observable<any> {
    return this.http.delete<apiResponse<Class>>(`${classurl}/${id}`).pipe(
      map(x=>x.data)
    )
  }
}