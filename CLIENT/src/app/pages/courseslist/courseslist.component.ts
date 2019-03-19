import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { SessionService } from 'src/app/services/session.service';
import { Course } from 'src/app/interfaces/course';
import { switchMap } from 'rxjs/operators';
import { Session } from 'src/app/interfaces/session';

@Component({
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.css']
})
export class CourseslistComponent implements OnInit {
  list: Course[];
  constructor(private courseService: CourseService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.getCourses();
    
  }
/* //Original
  getCourses(): void{
    this.sessionService.getSession().subscribe(
      x => {
        return this.courseService.getFromCompany(x.companyId).subscribe(
          courses => {
            this.list = courses;
          }
        )
      } 
    );
  }
*/
// Use switchmap //
  getCourses(): void{
    this.sessionService.getSession().pipe(
      switchMap((value: Session) =>  this.courseService.getFromCompany(value.companyId))
    ).subscribe(
      courses => {
        this.list = courses;
      }
    );
  }

  
    /*
    getFromCompany(id:number):Observable<Course[]> {
      return this.apiservice.get(`${companyurl}/${id}/courses`);
    }
    */

}