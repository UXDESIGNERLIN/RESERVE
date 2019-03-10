import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interfaces/company';
import { getMaxListeners } from 'cluster';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  company:Company = {
    id: 1,
    name: "",
    email:"",
    password:""
  };
  
  constructor(private companyService: CompanyService) { }

  ngOnInit() {

  }
  
  signup(): void {
    this.companyService.signup(this.company).subscribe(
      x => console.log("company",x)
    )
  }
  
 
}

