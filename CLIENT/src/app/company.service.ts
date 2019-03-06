import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';

let company: Company;

const companyurl:string = "api/company";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getById(id:number) :Observable<Company> {
    return this.http.get<Company>(`${companyurl}/${id}`);
  }
  
  signup(company:Company): Observable<void> {
    return this.http.post<void>(companyurl, company, httpOptions);
  }
}
