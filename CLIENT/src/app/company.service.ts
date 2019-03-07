import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Company } from './company';

let company: Company;

const companyurl:string = "http://localhost:3000/SERVER/index.php/api/v0/company";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface apiResponse<T> {
  success: boolean,
  code: string,
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getById(id:number) :Observable<Company> {
    return this.http.get<apiResponse<Company>>(`${companyurl}/${id}`).pipe(
      map((x)=>x.data)
    );
  }
  
  signup(company:Company): Observable<Company> {
    return this.http.post<apiResponse<Company>>(companyurl, company, httpOptions).pipe(
      map((x)=>x.data));
  }
}
