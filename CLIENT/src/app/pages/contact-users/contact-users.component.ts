import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CompanyService } from 'src/app/services/company.service';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { Class } from 'src/app/interfaces/class';

@Component({
  templateUrl: './contact-users.component.html',
  styleUrls: ['./contact-users.component.css']
})
export class ContactUsersComponent implements OnInit {
  id: string = this.activatedRoute.snapshot.paramMap.get("id");

  by: string = this.activatedRoute.snapshot.paramMap.get("by");

  member = {
    course_name: "",
    course_description: "",
    class_time: null,
    show: false, 
    label: ""
  }

  futureEngagement: boolean = false;
  futureEngagementAvailable: boolean = false;

  subject: string;
  msgBody: string;
  
  constructor (
    private companyService: CompanyService,
    private classesService: ClassesService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,) { }

  ngOnInit () {
    this.load();
  }

  load () {
    if (this.by == "event" || this.by == "schedule") {
      this.member.show = true;
      this.member.label = this.by == "event" ? "Event" : "Schedule";
      let service = this.by == "event" ? this.courseService : this.classesService;
      (service.getById(this.id) as Observable<Course | Class>).subscribe( (classOrCourse: any) => {
        this.member.course_name = classOrCourse.name;
        this.member.course_description = this.by == "event" ? classOrCourse.description : null;
        this.member.class_time = classOrCourse.tsIni;
        this.futureEngagementAvailable = (classOrCourse.tsIni != null) && (classOrCourse.tsIni > ((+Date.now()/1000) | 0));
      });
    }
  }

  send () {
    if (this.by == 'company') {
      this.companyService.engage(this.subject, this.msgBody).subscribe()
    }
    else if (this.by == 'schedule') {
      this.classesService.engage(this.id, this.subject, this.msgBody, this.futureEngagement).subscribe();
    }
    else if (this.by == 'event') {
      this.courseService.engage(this.id, this.subject, this.msgBody).subscribe();
    }
    else {
      this.alertService.error('Unknown');
    }
  }

}