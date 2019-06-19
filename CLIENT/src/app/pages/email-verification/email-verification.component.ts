import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  code: string = this.route.snapshot.paramMap.get("code");

  email: string = this.route.snapshot.paramMap.get("email");

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {
    this.urlWithId();
  }

  urlWithId() {
    if(this.email && this.code) {
      this.verify();
    }
  }

  verify() {
    return this.companyService.verify(this.email, this.code).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  directLogin() {
    this.verify();
  }

}
