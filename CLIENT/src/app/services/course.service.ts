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

  GetStatistics(id:number): Observable<{numClasses: number, languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numUsers: number, numRepeaters: number, avgReserves: number}>{
    return this.apiservice.get(`${courseurl}/${id}/statistics`);
  }

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
          this.apiservice.EraseCacheEntry(`${companyurl}/${course.companyId}/courses`);
        }
      )
    );
  }

  update(term: Course): Observable<Course> {
    return this.apiservice.put<Course>(`${courseurl}/${term.id}`, term).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${courseurl}/${term.id}`);
          this.apiservice.EraseCacheEntry(`${companyurl}/${term.companyId}/courses`);
        }
      )
    );
  }

  delete(id: number): Observable<void> {
    return this.apiservice.delete<void>(`${courseurl}/${id}`).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${courseurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${companyurl}/`, true);
        }
      )
    );
  }
}

/*
GetStatistics(): Observable<{numClasses: number, languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numUsers: number, numRepeaters: number, avgReserves: number}>;
The endpoint for this method is: GET - api/v0/course/:COURSE ID:/statistics

*/