import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { APIService } from './API.service';
import { tap } from 'rxjs/operators'; 


const companyurl: string = "company";
const courseurl: string = 'course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private apiservice: APIService) { }

  getFromCompany(id: number): Observable<Course[]> {
    return this.apiservice.get(`${companyurl}/${id}/courses`);
  }

  getById(id: number): Observable<Course> {
    return this.apiservice.get(`${courseurl}/${id}`);
  }

  create(course: Course): Observable<Course> {
    return this.apiservice.post<Course>(courseurl, course).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${companyurl}/${course.idCompany}/courses`);
        }
      )
    );
  }

  update(term: Course): Observable<Course> {
    return this.apiservice.put<Course>(`${courseurl}/${term.id}`, term).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${courseurl}/${term.id}`);
          this.apiservice.EraseCacheEntry(`${courseurl}/${term.idCompany}/courses`);
        }
      )
    );
  }

  delete(id: number): Observable<void> {
    return this.apiservice.delete<void>(`${courseurl}/${id}`).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${courseurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${companyurl}/`, true);
        }
      )
    );
  }
}
