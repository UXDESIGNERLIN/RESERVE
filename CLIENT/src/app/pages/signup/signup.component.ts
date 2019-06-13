import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interfaces/company';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  company:Company = {
    id: null,
    name: "",
    email:"",
    password:""
  };
  
  constructor(private companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {

  }
  
  signup(): void {
    this.companyService.signup(this.company).subscribe(
      x => {
        this.router.navigateByUrl("/login")
      }
    );
  }
  
 
}

