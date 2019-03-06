import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Course } from './course'; 

interface apiResponse<T> {
  success: boolean,
  code: string,
  data: T
}

const courseurl: string = 'http://localhost:3000/SERVER/index.php/api/v0/session';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  getAll():Observable<Course[]> {
    return this.http.get<apiResponse<Course[]>>(courseurl).pipe(
      map((x)=> x.data)
    );
  }


  getById(id:number): Observable<Course> {
    const url = `${courseurl}/${id}`
    return this.http.get<apiResponse<Course>>(url).pipe(
      map((x)=> x.data)
    );
  }
  
}
