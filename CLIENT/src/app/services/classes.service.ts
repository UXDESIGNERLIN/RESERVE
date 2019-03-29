import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../interfaces/class';
import { APIService } from './API.service';

const courseurl = "course";
const classurl = "class";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private apiservice: APIService) { }

  getFromCourse(id:number): Observable<Class[]> {
    return this.apiservice.get(`${courseurl}/${id}/classes`);
  }
  createToCourse(id:number, term:Class): Observable<Class> {
    return this.apiservice.post(`${courseurl}/${id}/classes`, term);
  }

  getById(id:number): Observable<Class> {
    return this.apiservice.get(`${classurl}/${id}`);
  }

  update(id:number,term:Class): Observable<Class> {
    return this.apiservice.put(`${classurl}/${id}`, term);
  }

  delete(id:number): Observable<any> {
    return this.apiservice.delete(`${classurl}/${id}`);
  }
}