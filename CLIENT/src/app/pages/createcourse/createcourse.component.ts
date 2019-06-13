import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';




@Component({
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {



  newCourse:Course = {
    id: null,
    companyId: null,
    name: "",
    description: "",
    reqInfo: ['email'],
    type: null
  }


  infos = [
    {label:"full name", value:"fname"},
    {label:"age", value:"age"},
    {label:"phone", value:"phone"},
    {label:"email", value:"email", required: true},
    {label:"gender", value:"gender"}
  ]
  
  id = this.activateRoute.snapshot.paramMap.get('id');

  creating: boolean = true;

  constructor(private courseService: CourseService,
              private activateRoute: ActivatedRoute,
              private sessionService: SessionService,
              private route: Router) { }

  ngOnInit() {
    this.sessionService.getSession().subscribe(
      (x) => {
        this.newCourse.companyId = x.companyId;
      }
    );
    this.courseDetail();
  }

  toggle(e: any) {
    
    if (e.target.checked) {
      this.newCourse.reqInfo.push(e.target.value) ;
    }
    else {
      this.newCourse.reqInfo = this.newCourse.reqInfo.filter(item=>item!=e.target.value);
    }
  }
  
  courseDetail(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id) {
      this.courseService.getById(id).subscribe(
        x => {
          this.newCourse = x;
          this.creating = !this.creating;
        }
      )
    }
    else {
      this.route.navigateByUrl("/main/createcourse");
    }
  }


  check(info): boolean {
    // Check whether info is in this.newCourse.reqInfo array
    return this.newCourse.reqInfo.includes(info);
  }


  // Course Type //   

  receiveCourseTypeId(e) {
    this.newCourse.type = e;
  }

  //Action either edit or create 
  updateOrCreate(): void {
    if (this.id) {
      this.courseService.update(this.newCourse).subscribe(
        x => this.route.navigateByUrl(`/main/courseslist`)
      );
    }
    else {
      this.courseService.create(this.newCourse).subscribe(
        x => {
          this.route.navigateByUrl(`/main/courseslist`);
        }
      );
    }  
  }



}
