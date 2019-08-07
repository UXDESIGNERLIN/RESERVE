import { Component, OnInit, Input } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { localTS2UTCTS, getUTCTS } from 'src/app/utils/time-utils';



@Component({
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  creating: boolean = true;

  utcts = (+new Date())-(new Date()).getTimezoneOffset()*60*1000;// Change the local time to UTC time zone 

  newClass: Class = {
    id: this.activateRoute.snapshot.paramMap.get("classid"),
    courseId: this.activateRoute.snapshot.paramMap.get("courseid"),
    tsIni: getUTCTS() + 3600, // UTC time one hour later in seconds 
    len: 3600,
    spots: null,
  }

  private _tsEnd: number = getUTCTS() + 7200; // UTC time two hours later in seconds
  
  constructor(private classesService: ClassesService,
              private activateRoute: ActivatedRoute,
              private route: Router) { 
              }

  ngOnInit() {
    this.classDetail();
  }

  classDetail() {
    if (this.newClass.id) {
      this.classesService.getById(this.newClass.id).subscribe( (c) => {
        this.newClass = c;
        this._tsEnd = c.tsIni + c.len;
        this.creating = false;
      });
    }
  }

  receiveCourseId(Eventarg) {
    this.newClass.courseId = Eventarg;
    this.route.navigateByUrl(`/main/schedule/${this.newClass.courseId}`);
  }

  updateOrCreate() {
    let upsert: Observable<Class>;
    this.newClass.len = this._tsEnd - this.newClass.tsIni;
    if (!this.creating) {
      upsert = this.classesService.update(this.newClass.id, this.newClass);
    }
    else {
      upsert = this.classesService.createToCourse(this.newClass.courseId, this.newClass);
    }
    upsert.subscribe(() => {
      this.route.navigateByUrl(`/main/schedules-list/${this.newClass.courseId}`);
    });
  }
 

}
