import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  templateUrl: './resset-password.component.html',
  styleUrls: ['./resset-password.component.css']
})
export class RessetPasswordComponent implements OnInit {

  title = 'RESSET PASSWORD';
  step = 0;

  private _code: string = this.route.snapshot.paramMap.get("code");
  private code: string;

  private _email: string = this.route.snapshot.paramMap.get("email");
  private email: string;

  private password: string;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.email = this._email;
    if (this.email != null) this.step++;
    this.code = this._code;
    if (this.code != null) this.step++;
  }

  recover () {
    switch (this.step) {
      case 2 : {
        this.companyService.resset(this.email, this.code, this.password).subscribe(() => {
          this.alertService.success('Password successfully changed');
          this.router.navigateByUrl("/login");
        });
      } break;
      case 1 : {
        this.step++;
      } break;
      case 0 : 
      default : {
        // TODO :: Check mail is +or- valid
        this.companyService.recover(this.email).subscribe(() => {
          this.step++;
        });
      } break;
    }
  }
}
