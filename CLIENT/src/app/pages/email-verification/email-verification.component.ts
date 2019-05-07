import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  code: string;
  email: string;


  constructor(private route: ActivatedRoute,
              private sessionService: SessionService,
              private companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {

    this.urlWithId();
  }

urlWithId() {
  this.email = this.route.snapshot.paramMap.get("email");
  this.code = this.route.snapshot.paramMap.get("code");
  if(this.email && this.code) {
    this.verify();
  }
}

  verify() {
    return this.companyService.verify(this.email, this.code).subscribe(
      () => {
        this.router.navigateByUrl('/login');
      }
    );
  }

  directLogin() {
    this.verify();
  }

}
