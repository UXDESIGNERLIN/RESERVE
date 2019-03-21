import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {



  newCourse:Course = {
    id: null,
    idCompany: null,
    name: "",
    description: "",
    reqInfo: []
  }


  infos = [
    {label:"full name", value:"fname"},
    {label:"age", value:"age"},
    {label:"phone", value:"phone"},
    {label:"email", value:"email"},
    {label:"gender", value:"gender"}
  ]
  
  id = + this.activateRoute.snapshot.paramMap.get('id');
  constructor(private courseService: CourseService,
              private activateRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
   this.courseDetail();
   console.log("original", this.newCourse.name);
  }



  toggle(e: any) {
    if (e.target.checked) {
      this.newCourse.reqInfo.push(e.target.value) ;
    }
    else {
      this.newCourse.reqInfo = this.newCourse.reqInfo.filter(item=>item!=e.target.value);
    }
    console.log("toggle update",  e);
  }
  
  save(name, description) {
    this.newCourse.name = name;
    this.newCourse.description = description;
    this.courseService.create(this.newCourse).subscribe(
      x => {
        console.log("course", x);
      }
    );
    console.log("save", this.newCourse);
  }

  courseDetail(): void {
    const id = + this.activateRoute.snapshot.paramMap.get('id');
    if(id) {
      this.courseService.getById(id).subscribe(
        x => this.newCourse = x
      )
    }
    else {
      this.route.navigateByUrl("/main/createcourse");
    }
  }

// WITH ngModel
update(): void {
  this.courseService.update(this.newCourse).subscribe(
    );
  console.log("update",this.newCourse.reqInfo);
}
//checkbox
check(info): boolean {
  for(let i = 0; i<=this.newCourse.reqInfo.length; i++) {
    if(this.newCourse.reqInfo[i]==info) {
      return true;
    }
  }
}




/* //without ngModel
  update(name, description): void {
      this.newCourse.name = name;
      this.newCourse.description = description;
      this.courseService.update(this.newCourse).subscribe(
      )
      console.log(this.newCourse, name, description);
    }
*/
    /*
     getById(id:number): Observable<Course> {
    return this.apiservice.get(`${courseurl}/${id}`);
  }*/

}
