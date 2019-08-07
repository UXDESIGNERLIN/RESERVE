import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {

  private _picture: File;

  newCourse:Course = {
    id: this.activateRoute.snapshot.paramMap.get('id'),
    companyId: null,
    name: "",
    description: "",
    reqInfo: ['email', 'phone', 'fname'],
    type: null,
    picture_name: null,
    contact: "",
    location: "",
    price: ""
  }

  infos = [
    {label:"full name", value:"fname"},
    {label:"age", value:"age"},
    {label:"phone", value:"phone"},
    {label:"email", value:"email", required: true},
    {label:"gender", value:"gender"}
  ]

  creating: boolean = true;

  constructor(private courseService: CourseService,
              private activateRoute: ActivatedRoute,
              private sessionService: SessionService,
              private route: Router) { }

  ngOnInit() {
    this.sessionService.getSession().subscribe( (session) => {
      this.newCourse.companyId = session.companyId;
    });
    this.courseDetail();
  }

  toggleInfoBox(e: any) {
    if (e.target.checked) {
      this.newCourse.reqInfo.push(e.target.value);
    }
    else {
      this.newCourse.reqInfo = this.newCourse.reqInfo.filter(item=>item!=e.target.value);
    }
  }
  
  courseDetail(): void {
    if (this.newCourse.id) {
      this.courseService.getById(this.newCourse.id).subscribe( (course) => {
        this.newCourse = course;
        this.newCourse.picture_name = ((<any>course).picture == '') ? null : 'https://reserve.myspotbook.com/pictures/'+(<any>course).picture;
        this.creating = false;
      });
    }
  }


  checkInfoBox(info: string): boolean {
    // Check whether info is in this.newCourse.reqInfo array
    return this.newCourse.reqInfo.includes(info);
  } 

  receiveCourseTypeId(e) {
    this.newCourse.type = e;
  }

  onFileSelected(f: File) {
    this._picture = f;
  }

  onFileChanged(event: any) {
    this._picture = event.target ? event.target.files[0] : event.srcElement.files[0];
  }

  //Action either edit or create 
  updateOrCreate(): void {
    let upsert: Observable<Course>;
    if (!this.creating) {
      upsert = this.courseService.update(this.newCourse, this._picture);
    }
    else {
      upsert = this.courseService.create(this.newCourse, this._picture);
    }  
    upsert.subscribe(
      () => this.route.navigateByUrl(`/main/events-list`)
    );
  }

}
