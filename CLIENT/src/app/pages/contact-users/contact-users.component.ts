import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CompanyService } from 'src/app/services/company.service';
import { AlertService } from 'src/app/services/alert.service';
import { load } from '@angular/core/src/render3';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html',
  styleUrls: ['./contact-users.component.css']
})
export class ContactUsersComponent implements OnInit {
  id: string = this.activatedRoute.snapshot.paramMap.get("id");
  by: string = this.activatedRoute.snapshot.paramMap.get("by");

  member = {
    course_name: "",
    course_description: "",
    class_time: null
  }

  member_show = {
    course: false,
    class: false
  }

  futureEngagement: boolean = false;
  futureEngage: boolean = false;

  all_members_class: boolean;

  subject: string;
  msgBody: string;
  classId: number = 8;
  constructor(
    private companyService: CompanyService,
    private classesService: ClassesService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private reservationService: ReservationService,
    private router: Router) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.member_show[this.by] = true;
    console.log("futureEngage", this.futureEngage, this.by);
    console.log("show", this.member_show);
    if (this.by == "course") {
      this.courseService.getById(this.id).subscribe(
        (course) => {

          this.member.course_name = course.name;
          this.member.course_description = course.description;
        }
      );
    }
    else if (this.by == "class") {
      this.futureEngage = true;
      //FutureEngage will become false when 
      this.classesService.getById(this.id).subscribe(
        (classes) => {
          console.log("Date", Date.now());
          this.member.class_time = classes.tsIni;
          if(classes.tsIni == +Date.now()) {
            this.futureEngage = false;
          }
        }
      );
    }


  }



  send() {
    if (this.by == 'company') {
      this.companyService.engage(this.subject, this.msgBody).subscribe(
        (x) => {
          console.log("send to company all", x);
        }
      )
    }
    else if (this.by == 'class') {

      this.classesService.engage(this.id, this.subject, this.msgBody, this.futureEngagement).subscribe(
        (x) => {
          console.log("send to classes", x);
        }
      );
    }
    else if (this.by == 'course') {
      this.courseService.engage(this.id, this.subject, this.msgBody).subscribe();
    }

    else {
      this.alertService.error('Unknown');
    }

  }

  tick(event) {
    if (event) {
      this.futureEngagement = true;
    }
    console.log(event);


  }



}

/*
 engage(id:number, subject:string, msgbody:string): Observable<void> {
    return this.apiservice.post<void>(`${classurl}/${id}/engage`, {subject, msgbody});
  }
*/