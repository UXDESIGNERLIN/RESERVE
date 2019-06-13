import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Class } from '../interfaces/class';
import { APIService } from './API.service';

const courseurl = "course";
const classurl = "class";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private apiservice: APIService) { }

  engage(id:string, subject:string, msgbody:string, futureEngagement:boolean ): Observable<void> {
    return this.apiservice.post<void>(`${classurl}/${id}/engage`, {subject, msgbody, futureEngagement});
  }

  GetStatistics(id:string): Observable<{languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numRepeaters: number}>{
    return this.apiservice.get(`${classurl}/${id}/statistics`);
  }

  getFromCourse(id: string): Observable<Class[]> {
    return this.apiservice.get(`${courseurl}/${id}/classes`);
  }

  createToCourse(id: string, term: Class): Observable<Class> {
    return this.apiservice.post<Class>(`${courseurl}/${id}/classes`, term).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${courseurl}/${id}/classes`);
        }
      )
    );
  }

  getById(id: string): Observable<Class> {
    return this.apiservice.get(`${classurl}/${id}`);
  }

  update(id: string, term: Class): Observable<Class> {
    return this.apiservice.put<Class>(`${classurl}/${id}`, term).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${classurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${courseurl}/${term.courseId}/classes`);
        }
      )
    );
  }

  delete(id: string): Observable<any> {
    return this.apiservice.delete(`${classurl}/${id}`).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${classurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${courseurl}/`, true);
        }
      )
    );
  }
}

/*
GetStatistics(): Observable<{languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numRepeaters: number}>;
The endpoint for this method is: GET - api/v0/class/:CLASS ID:/statistics

*/