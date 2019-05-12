import { Component, OnInit, Input } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  id = + this.activateRoute.snapshot.paramMap.get("id");
  
  creating: boolean = true;

  courseId: number;

  newClass: Class = {
    id: null,
    courseId: this.courseId,
    tsIni: (+(new Date())) + 3600, 
    len: null,
    spots: null,
    //reqInfo:[]
  }
  
  
  constructor(private classesService: ClassesService,
              private activateRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.classDetail();
    
  }

  classDetail() {
    if(this.id) {
      this.creating = false;
      this.classesService.getById(this.id).subscribe(
        x => {
          this.newClass = x;
          this.courseId = x.courseId;
        }
      )
     
    }
  }


  receiveCourseId(Eventarg) {
    if(this.id) {
      Eventarg = this.courseId;
    }
    else {
      this.courseId = Eventarg;
    }
  }
  updateOrCreate() {
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
    
  }

/*
 createToCourse(id:number, term:Class): Observable<Class> {
    return this.apiservice.post(`${courseurl}/${id}/classes`, term);
  }
  */
}
