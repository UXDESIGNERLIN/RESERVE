import { Injectable } from '@angular/core';
import { APIService } from './API.service';
import { courseTypes } from '../interfaces/courseTypes';
import { Observable } from 'rxjs';

const courseTypeUrl: string = "course_types";

@Injectable({
  providedIn: 'root'
})
export class CourseTypesService {

  constructor(private apiService: APIService) { }

  getAll(): Observable<courseTypes[]> {
    return this.apiService.get(courseTypeUrl);
  }
}
