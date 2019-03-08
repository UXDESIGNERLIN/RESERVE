import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company';
import { APIService } from './API.service';

const companyurl:string = "http://localhost:3000/SERVER/index.php/api/v0/company";


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private apiservice: APIService) { }

  getById(id:number) :Observable<Company> {
    return this.apiservice.get(`${companyurl}/${id}`);
  }
  
  signup(company:Company): Observable<Company> {
    return this.apiservice.post(companyurl, company);
  }
  
}
