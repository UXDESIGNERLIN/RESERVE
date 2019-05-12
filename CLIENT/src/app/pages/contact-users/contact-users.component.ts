import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CompanyService } from 'src/app/services/company.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html',
  styleUrls: ['./contact-users.component.css']
})
export class ContactUsersComponent implements OnInit {
  id: number = + this.activatedRoute.snapshot.paramMap.get("id");
  by: string = this.activatedRoute.snapshot.paramMap.get("by");
  subject: string;
  msgBody: string;
  classId: number = 8;
  constructor(
              private companyService: CompanyService,
              private classesService: ClassesService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  send() {
    if(this.by == 'company') {
      this.companyService.engage(this.subject, this.msgBody).subscribe(
        (x) => {
          console.log("send to company all", x);
        }
      )
    }
    else if(this.by=='class') {
      this.classesService.engage(this.id, this.subject, this.msgBody).subscribe(
        (x) => {
          console.log("send to classes", x);
        }
      );
    }
    else if (this.by=='course') {
      this.courseService.engage(this.id, this.subject, this.msgBody).subscribe(
        (x) => {
          console.log("send to course",x);
        }
      );
    }

    else {
      this.alertService.error('Unknown');
    }

  }
    
  

}

/*
 engage(id:number, subject:string, msgbody:string): Observable<void> {
    return this.apiservice.post<void>(`${classurl}/${id}/engage`, {subject, msgbody});
  }
*/