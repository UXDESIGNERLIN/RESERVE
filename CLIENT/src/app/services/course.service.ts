import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { APIService } from './API.service'; 


const companyurl: string = "company";
const courseurl: string = 'course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private apiservice: APIService) { }

  getFromCompany(id:number):Observable<Course[]> {
    return this.apiservice.get(`${companyurl}/${id}/courses`);
  }

  getById(id:number): Observable<Course> {
    return this.apiservice.get(`${courseurl}/${id}`);
  }

  create(course:Course):Observable<Course> {
    return this.apiservice.post(courseurl, course);
  }

  update(term:Course): Observable<Course> {
    return this.apiservice.put(`${courseurl}/${term.id}`, term);
  }

  delete(id:number): Observable<void> {
    return this.apiservice.delete(`${courseurl}/${id}`);
  }
}
