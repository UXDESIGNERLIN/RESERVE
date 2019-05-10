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

  engage(id:number, subject:string, msgbody:string): Observable<void> {
    return this.apiservice.post<void>(`${classurl}/${id}/engage`, {subject, msgbody});
  }

  GetStatistics(id:number): Observable<{languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numRepeaters: number}>{
    return this.apiservice.get(`${classurl}/${id}/statistics`);
  }

  getFromCourse(id: number): Observable<Class[]> {
    return this.apiservice.get(`${courseurl}/${id}/classes`);
  }

  createToCourse(id: number, term: Class): Observable<Class> {
    return this.apiservice.post<Class>(`${courseurl}/${id}/classes`, term).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${courseurl}/${id}/classes`);
        }
      )
    );
  }

  getById(id: number): Observable<Class> {
    return this.apiservice.get(`${classurl}/${id}`);
  }

  update(id: number, term: Class): Observable<Class> {
    return this.apiservice.put<Class>(`${classurl}/${id}`, term).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(`${classurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${courseurl}/${term.courseId}/classes`);
        }
      )
    );
  }

  delete(id: number): Observable<any> {
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