import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectcourse',
  templateUrl: './selectcourse.component.html',
  styleUrls: ['./selectcourse.component.css']
})
export class SelectcourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
/*
  getFromCourse(id:number): Observable<Class[]> {
    return this.apiservice.get(`${courseurl}/${id}/classes`);
  }
  createToCourse(id:number, term:Class): Observable<Class> {
    return this.apiservice.post(`${courseurl}/${id}/classes`, term);
  }
*/
}
