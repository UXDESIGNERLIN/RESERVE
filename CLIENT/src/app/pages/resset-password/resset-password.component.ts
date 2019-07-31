import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.email = this._email;
    if (this.email != null) setTimeout(() => { this.step++; }, 100);
    this.code = this._code;
    if (this.code != null) setTimeout(() => { this.step++; }, 200);
  }

  recover () {
    switch (this.step) {
      case 2 : {
        // Send mail, code, and new password to resset
        // Wait for response and act from there.
      } break;
      case 1 : {
        this.step++;
      } break;
      case 0 : 
      default : {
        // Check mail is +or- valid
        // Send mail to recover
        this.step++;
      } break;
    }
  }
}
