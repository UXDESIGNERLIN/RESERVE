import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';



@Component({
  selector: 'app-courseslist',
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.css']
})
export class CourseslistComponent implements OnInit {
  courses:Course[] = [{
    id: 1,
    idCompany: 1,
    name: "haha",
    description: "hahaha",
    reqInfo: ["oh", "mm"]
  },
  {
    id: 2,
    idCompany: 2,
    name: "aa",
    description: "aaa",
    reqInfo: ["meow", "kk"]
  }
  ]
  reqInfo = [""];

  show:boolean = false;
 
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    
  }

  newCourse(): boolean{
    this.show = true;
    return this.show;
  }
  save(name, description, reqInfo): boolean{
    this.courseService.create({id:5, idCompany:2, name, description, reqInfo}).subscribe(
      x => {
        console.log("courses",x)
      }
    )
    this.show = false;
    return this.show;
  }


  /*
   create(course:Course):Observable<Course> {
    return this.apiservice.post(courseurl, course);
  }
  */

}
