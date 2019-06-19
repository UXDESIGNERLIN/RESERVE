import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-selectcourse',
  templateUrl: './selectcourse.component.html',
  styleUrls: ['./selectcourse.component.css']
})
export class SelectcourseComponent implements OnInit {
  
  @Input() selectedCourse: string = null;
  @Output() selectEvent = new EventEmitter<string>();
  @Input() disabledOrnot: boolean = false;
  courses: Course[];

  constructor(private courseService: CourseService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.sessionService.getSession().subscribe((session) => {
        this.courseService.getFromCompany(session.companyId).subscribe((courses) => {
          this.courses = courses;
        });
    });
  }

  sendSelected() {
    this.selectEvent.emit(this.selectedCourse);
  }

}
