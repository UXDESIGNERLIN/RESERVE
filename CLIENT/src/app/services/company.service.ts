import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company';
import { APIService } from './API.service';
import { tap } from 'rxjs/operators'; 

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
  getSelf(id: number):Observable<Company> {
    return this.apiservice.get(companyurl);
  }
  
  signup(company:Company): Observable<Company> {
    return this.apiservice.post<Company>(companyurl, company).pipe(
      tap(
        () => {
          //this.apiservice.EraseCacheEntry(companyurl);
        }
      )
    )
  }

  update(company:Company): Observable<void>  {
    return this.apiservice.put<void>(companyurl, company).pipe(
      tap(
        () => {
          this.apiservice.EraseCacheEntry(`${companyurl}/${company.id}`);
          this.apiservice.EraseCacheEntry(companyurl);
        }
      )
    );
  }
  
}

/*  comapny.ts 
    id: number,
    password: string,
    name: string,
    email: string
*/