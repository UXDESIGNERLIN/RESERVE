import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company';
import { APIService } from './API.service';

const companyurl:string = "company";


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private apiservice: APIService) { }
/*
  getById(id:number) :Observable<Company> {
    return this.apiservice.get(`${companyurl}/${id}`);
  }
  
*/
  
  signup(company:Company): Observable<Company> {
    return this.apiservice.post(companyurl, company);
  }
  
}
