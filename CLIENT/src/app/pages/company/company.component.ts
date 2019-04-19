import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { SessionService } from 'src/app/services/session.service';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company_info: Company = {
    id: null,
    email: "",
    password:"",
    name: ""
  };

  constructor(private companyService: CompanyService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.showDetail();
  }

  showDetail() {
    return this.sessionService.getSession().subscribe( (session) => {
      console.log("test the session: ",session);
      return this.companyService.getSelf(session.companyId).subscribe( (company:Company) => {
        this.company_info = company;
        console.log("COMPANY INFO: ",company);
      })
    })
  
  }


/*
  showDetail(id:number) {
    return this.companyService.getSelf(id).subscribe( (company) => {
      console.log("Company Info: ",company);
    })
  }
*/
}
