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

  engage(subject:string, msgbody:string ): Observable<void> {
    return this.apiservice.post<void>(`${companyurl}/engage`, {subject, msgbody});
  }

  GetStatistics(): Observable<{numCourses: number, numClasses: number, languages: any, genders: {males: number, females: number, unknown: number}, ages: {grp1: number, grp2: number, grp3: number, grp4: number, unknown: number}, numUsers: number, numRepeaters: number}> {
    return this.apiservice.get(`${companyurl}/statistics`);
  }

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

  verify (email: string, secretCode: string): Observable<void> {
    return this.apiservice.put<void>(`${companyurl}/verify`, {challenge: secretCode, email});
  }
  
}

/*  comapny.ts 
    id: number,
    password: string,
    name: string,
    email: string
*/

/*
CompanyService should have a method with signature: 
Verify (companyId: string, secretCode: string): Observable<void>;

The endpoint for this method is: PUT - api/v0/company/:COMPANY ID:/verify
*/