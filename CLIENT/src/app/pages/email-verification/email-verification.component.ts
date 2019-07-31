import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  title = 'VERIFY YOUR EMAIL';

  private _code: string = this.route.snapshot.paramMap.get("code");
  private code: string;

  private _email: string = this.route.snapshot.paramMap.get("email");
  private email: string;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private router: Router,
              private _alertService: AlertService) { }

  ngOnInit() {
    this.urlWithId();
  }

  urlWithId() {
    this.email = this._email;
    this.code = this._code;
    if(this.email && this.code) {
      this.verify();
    }
  }

  verify() {
    return this.companyService.verify(this.email, this.code).subscribe(() => {
      this._alertService.success('Verification successful, you can now login!')
      this.router.navigateByUrl('/login');
    });
  }

  directLogin() {
    this.verify();
  }

}
