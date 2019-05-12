import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { SessionService } from 'src/app/services/session.service';
import { Company } from 'src/app/interfaces/company';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  new_password: string = "";
  repeat_password: string = "";
  company_info: Company = {
    id: null,
    email: "",
    password:"",
    name: ""
  };

  constructor(private companyService: CompanyService,
              private sessionService: SessionService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.showDetail();
  }

  showDetail() {
    return this.sessionService.getSession().subscribe( (session) => {
      console.log("test the session: ",session);
      return this.companyService.getSelf(session.companyId).subscribe( (company:Company) => {
        this.company_info = company;
      })
    })
  
  }

  save() {
    if(this.new_password == this.repeat_password) {
      (<any>this.company_info).new_password = this.new_password; // in company info, we are creating a new property which is new_password and the value is this.new_password
      this.companyService.update(this.company_info).subscribe( () => {
        this.alertService.success("UPDATE CORRECT");
      } );
    }
    else {
      console.error("PASSWORDS ARE NOT THE SAME");
      this.alertService.error("PASSWORDS ARE NOT THE SAME");
    }

    // If new password and repeated are the same.
    // Update company information.

    /*
    return this.sessionService.getSession().subscribe((session) => {
      return this.companyService.getSelf(session.companyId).subscribe((company_original) => {
        if (this.company_info.password == company_original.password) {
          this.companyService.update(this.company_info).subscribe();
        }
        if (this.new_password != "" && (this.new_password == this.repeat_password)) {
          console.log("new_password", this.new_password, "company_info password", this.company_info.password);
          this.companyService.update(this.company_info).subscribe(() => {
            console.log('Update is correct');
          });
        }
      });
    });
    */
  }


/*
  showDetail(id:number) {
    return this.companyService.getSelf(id).subscribe( (company) => {
      console.log("Company Info: ",company);
    })
  }
*/
}
