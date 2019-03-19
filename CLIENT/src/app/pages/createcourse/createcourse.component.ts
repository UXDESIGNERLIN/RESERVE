import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';




@Component({
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {
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
  

  show:boolean = false;
 
  constructor(private courseService: CourseService) { }

  ngOnInit() {
   
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
  
  save() { 
    this.courseService.create(this.newCourse).subscribe(
      x => {
        console.log("course", x);
      }
    );
    console.log("save", this.newCourse);
  }

}
