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
    companyId: null,
    name: "",
    description: "",
    reqInfo: ['email']
  }


  infos = [
    {label:"full name", value:"fname"},
    {label:"age", value:"age"},
    {label:"phone", value:"phone"},
    {label:"email", value:"email", required: true},
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
  /*
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
*/
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
/*
updateOrCreate(): void { 
  this.courseService.update(this.newCourse).subscribe(
    );
  console.log("update",this.newCourse.reqInfo);
}
*/
//checkbox use loop

check(info): boolean {
  // Check whether info is in this.newCourse.reqInfo array
  return this.newCourse.reqInfo.includes(info);
}

//checkbox use prototype function 
/*
check(info): boolean {
  // Check whether info is in this.newCourse.reqInfo array
      this.newCourse.reqInfo.forEach(
        x => {
          if(x==info) return true
        }
      )
     
    }
*/  
    
  

//email will always be checked
/*
alwaysChecked(info): boolean{
  if (info=='email') {
    //this.newCourse.reqInfo.push(info);
    return true
  }
}
*/


//Action either edit or create 
updateOrCreate(): void {
  if (this.id) {
    this.courseService.update(this.newCourse).subscribe(
      x => 
        this.route.navigateByUrl(`/main/courseslist`)
      
    )
  }
  else {
    this.courseService.create(this.newCourse).subscribe(
      x => this.route.navigateByUrl(`/main/courseslist`))
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

/*
 if(this.newClass.id) {
      
      this.classesService.update(this.newClass.id, this.newClass).subscribe(
        x => {
          this.route.navigateByUrl(`/main/classeslist/${this.courseId}`);
        }
      );
    }
    else {
      console.log("create", this.courseId, this.newClass)
      this.classesService.createToCourse(this.courseId, this.newClass).subscribe(
        x => {
          this.route.navigateByUrl(`/main/classeslist/${this.courseId}`);
        }
      )
    }
    */

}
