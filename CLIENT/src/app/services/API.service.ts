import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, empty } from 'rxjs';
import { catchError,map, tap, finalize, share } from 'rxjs/operators';


interface apiResponse<T> {
  success: boolean,
  code: string,
  data: T
}

const base_url = `https://api.myspotbook.com/api/v0/`;
 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true // for using cookie (important)
};

@Injectable({
  providedIn: 'root'
})
export class APIService {
  // pending requests handling //
  static pending: number = 0; 
  
  constructor(private http: HttpClient) { }

  //CACHE
  private cache = new Map();
  
  //method for erase the entry of cache when updating info
  EraseCacheEntry(key: string, andChilds: boolean=false) {
    if (andChilds) {
      let filter = new RegExp('^'+key);
      let toDelete: string[] = [];
      this.cache.forEach((v: any, k: string) => {
        if (filter.test(k)) {
          toDelete.push(k);
        }
      });

      toDelete.forEach((e: string) => {
        this.cache.delete(e);
      });
    }
    else {
      this.cache.delete(key);
    }
  }

  // To clean everything in the cache: When user logout, we will erase the cache
  EraseCache() {
    this.cache.clear();
  }

  get<T>(url:string): Observable<T> {
    
    if (this.cache.has(url)) {
      console.log("cached result", this.cache.get(url));
      return this.cache.get(url);
    }
    else {
      console.log("no chached result");
      setTimeout(()=>APIService.pending++,0);
      let value=this.http.get<apiResponse<T>>(`${base_url}${url}`, httpOptions).pipe(
        finalize(() => APIService.pending--),
        tap((x)=>{
          if(!x.success) {
            throw {error: x};
          }
        }),
        map(x=>x.data),
        tap((x)=>{
          this.cache.set(url, of(x));
        }),
        catchError((err:any,caught:Observable<T>) => {
          let error = err.error;
          this.EraseCacheEntry(url); // erase the key of cache when there is an error
          // To check whether it's problem of request or our api
          if ('code' in error) {
            console.log('Request error');
          }
          else {
            console.log('api error');
            error = {
              success: false,
              data: "",
              code: "UNHANDLED_ERROR"
            }
          }
          //console.log("there is an error", err, caught);
          console.error(error.code);
          return (empty() as Observable<T>);
        }),
        share()
      );
      this.cache.set(url, value);
      
      return value;
    }
    
  }

  post<T>(url:string, term:any): Observable<T> {
    setTimeout(()=>APIService.pending++,0);
    return this.http.post<apiResponse<T>>(`${base_url}${url}`, term, httpOptions).pipe(
      finalize(() => APIService.pending--),
      tap((x)=>{
        if(!x.success) {
          throw {error: x};
        }
      }),
      map(x=>x.data),
      catchError((err:any,caught:Observable<T>) => {
        let error = err.error;
        // To check whether it's problem of request or our api
        if ('code' in error) {
          console.log('Request error');
        }
        else {
          console.log('api error');
          error = {
            success: false,
            data: "",
            code: "UNHANDLED_ERROR"
          }
        }
        //console.log("there is an error", err, caught);
        console.error(error.code);
        return (empty() as Observable<T>);
      }),
    );
  }

  put<T>(url:string, term:any): Observable<T> {
    setTimeout(()=>APIService.pending++,0);
    return this.http.put<apiResponse<T>>(`${base_url}${url}`, term, httpOptions).pipe(
      finalize(() => APIService.pending--),
      tap((x)=>{
        if(!x.success) {
          throw {error: x};
        }
      }),
      map(x=>x.data),
      catchError((err:any,caught:Observable<T>) => {
        let error = err.error;
        // To check whether it's problem of request or our api
        if ('code' in error) {
          console.log('Request error');
        }
        else {
          console.log('api error');
          error = {
            success: false,
            data: "",
            code: "UNHANDLED_ERROR"
          }
        }
        //console.log("there is an error", err, caught);
        console.error(error.code);
        return (empty() as Observable<T>);
      }),
    );
  }

  delete<T>(url:string): Observable<T> {
    setTimeout(()=>APIService.pending++,0);
    return this.http.delete<apiResponse<T>>(`${base_url}${url}`, httpOptions).pipe(
      finalize(() => APIService.pending--),
      tap((x)=>{
        if(!x.success) {
          throw {error: x};
        }
      }),
      map(x=>x.data),
      catchError((err:any,caught:Observable<T>) => {
        let error = err.error;
        // To check whether it's problem of request or our api
        if ('code' in error) {
          console.log('Request error');
        }
        else {
          console.log('api error');
          error = {
            success: false,
            data: "",
            code: "UNHANDLED_ERROR"
          }
        }
        //console.log("there is an error", err, caught);
        console.error(error.code);
        return (empty() as Observable<T>);
      }),
    )
  }
}



