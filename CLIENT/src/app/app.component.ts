import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company.service';
import { SessionService } from './services/session.service';
import { CourseService } from './services/course.service';
import { Company } from './interfaces/company';
import { Session } from './interfaces/session';
import { APIService } from './services/API.service';
import { correctHeight, detectBody } from './app.helpers';
import { Router, NavigationEnd } from '@angular/router';

const fakecompany: Company = {
  id: 5,
  password: "lalala",
  name: "chialing",
  email: "ling@gmail.com"
}

declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private sessionService: SessionService,
    private courseService: CourseService,
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        correctHeight();
        detectBody();
      }
    });
  }

  ngOnInit(){
    /*
    this.sessionService.login("ling@gmail.com", "lalala").subscribe(
      (r)=>{
        console.log(r)
        //this.sessionService.getSession().subscribe(after=>console.log(after))
      }
    );
*/
    //this.sessionService.getSession().subscribe(before => {
    //  console.log(before);
    //});
    //this.courseService.getAll().subscribe(x=>console.log("course", x));
    //this.companyService.signup(fakecompany).subscribe(x=>console.log(x));
  }
  
  loading() {
    return APIService.pending > 0;
  }

  ngAfterViewInit() {
    jQuery(window).bind("load resize", function() {
      correctHeight();
      detectBody();
    });
        
    // Correct height of wrapper after metisMenu animation.
    jQuery('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300)
    });
  }

}
