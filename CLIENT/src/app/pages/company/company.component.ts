import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
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
              private alertService: AlertService) { }

  ngOnInit() {
    this.showDetail();
  }

  showDetail() {
    return this.companyService.getSelf().subscribe( (company:Company) => {
      this.company_info = company;
    });
  }

  save() {
    if(this.new_password == this.repeat_password) {
      (<any>this.company_info).new_password = this.new_password; // in company info, we are creating a new property which is new_password and the value is this.new_password
      this.companyService.update(this.company_info).subscribe( () => {
        this.alertService.success("Update correct");
      } );
    }
    else {
      this.alertService.error("Passwords are not the same");
    }
  }

}
