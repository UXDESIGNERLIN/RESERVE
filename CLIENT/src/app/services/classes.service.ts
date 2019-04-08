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

  getFromCourse(id: number): Observable<Class[]> {
    return this.apiservice.get(`${courseurl}/${id}/classes`);
  }

  createToCourse(id: number, term: Class): Observable<Class> {
    return this.apiservice.post<Class>(`${courseurl}/${id}/classes`, term).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${courseurl}/${id}/classes`);
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
          this.apiservice.EraseCacheEntry(`${classurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${courseurl}/${term.idCourse}/classes`);
        }
      )
    );
  }

  delete(id: number): Observable<any> {
    return this.apiservice.delete(`${classurl}/${id}`).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${classurl}/${id}`);
          this.apiservice.EraseCacheEntry(`${courseurl}/`, true);
        }
      )
    );
  }
}