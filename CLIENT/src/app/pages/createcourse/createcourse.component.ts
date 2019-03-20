import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute } from '@angular/router';




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
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
   this.courseDetail();
  }



  toggle(e: any) {
    if (e.target.checked) {
      this.newCourse.reqInfo.push(e.target.value) ;
    }
    else {
      this.newCourse.reqInfo = this.newCourse.reqInfo.filter(item=>item!=e.target.value);
    }
    console.log(this.newCourse.reqInfo, e.target.value, e.target.checked);
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
    this.courseService.getById(id).subscribe(
      x => this.newCourse = x
    )
  }

  
  update(term): void {
    
      this.newCourse.name = term;
      this.courseService.update(this.newCourse).subscribe(
        x=>console.log("update",x)
      )
      

      
      console.log(term);
    }

    /*
     getById(id:number): Observable<Course> {
    return this.apiservice.get(`${courseurl}/${id}`);
  }*/

}
