import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';
import { SessionService } from 'src/app/services/session.service';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-selectcourse',
  templateUrl: './selectcourse.component.html',
  styleUrls: ['./selectcourse.component.css']
})
export class SelectcourseComponent implements OnInit {
  
  selectedCourse: number = null;
  @Output() selectEvent = new EventEmitter<number>();

  courses: Course[];
  constructor(private courseService: CourseService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.sessionService.getSession().subscribe(
      x => {
        this.courseService.getFromCompany(x.companyId).subscribe(
          x => this.courses = x
        )
      }
    )
  }

  sendSelected() {
    this.selectEvent.emit(this.selectedCourse);
    console.log("kid",this.selectedCourse);
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
