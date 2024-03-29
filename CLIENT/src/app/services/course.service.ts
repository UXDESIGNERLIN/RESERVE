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

  engage(id:string, subject:string, msgbody:string): Observable<void> {
    return this.apiservice.post<void>(`${courseurl}/${id}/engage`, {subject, msgbody});
  }

  GetStatistics(id:string): Observable<{numClasses: number, languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numUsers: number, numRepeaters: number, avgReserves: number}>{
    return this.apiservice.get(`${courseurl}/${id}/statistics`);
  }

  getFromCompany(id: string): Observable<Course[]> {
    return this.apiservice.get(`${companyurl}/${id}/courses`);
  }

  getById(id: string): Observable<Course> {
    return this.apiservice.get(`${courseurl}/${id}`);
  }

  create(course: Course, f: File): Observable<Course> {
    return this.apiservice.post<Course>(courseurl, this.apiservice.prepareUpload(f, course), { headers: null }).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${companyurl}/${course.companyId}/courses`);
        }
      )
    );
  }

  update(term: Course, f: File): Observable<Course> {
    // We have to POST due to back-end issues with uploading files.
    return this.apiservice.post<Course>(`${courseurl}/${term.id}`, this.apiservice.prepareUpload(f, term), { headers: null }).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${courseurl}/${term.id}`);
          this.apiservice.EraseCacheEntry(`${companyurl}/${term.companyId}/courses`);
        }
      )
    );
  }

  delete(id: string): Observable<void> {
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