import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, empty } from 'rxjs';
import { catchError,map, tap, finalize, share } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { readableError } from './readableError';


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
  
  constructor(private http: HttpClient,
              private alertService: AlertService) { }

  //CACHE
  private cache = new Map();// instantiating Map
  
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

  // function Parameter for Catcherror()
  ErrorHandling<T>(url: string) {
    return (err:any,caught:Observable<T>) => {
      let error = err.error;
      this.EraseCacheEntry(url); // erase the key of cache when there is an error
      // To check whether it's problem of request or our api
      if (!('code' in error)) {
        error = {
          success: false,
          data: "",
          code: "UNHANDLED_ERROR"
        }
      }
      this.alertService.error(readableError(error.code, error.data));
      return (empty() as Observable<T>); // finish the data before reaching subscription
    }
  }

  get<T>(url:string): Observable<T> {
    if (this.cache.has(url) && this.cache.get(url).ts >= +(Date.now())-(10*60*1000) ) {
      return this.cache.get(url).ans;
    }
    else {
      setTimeout(()=>APIService.pending++,0); // For angular purpose : the app component html template *ngIf
      let value=this.http.get<apiResponse<T>>(`${base_url}${url}`, httpOptions).pipe(
        finalize(() => APIService.pending--),
        tap((x)=>{
          if(!x.success) {
            throw {error: x};
          }
        }),
        map(x=>x.data),
        tap((x)=>{
          this.cache.set(url, {ans: of(x), ts: +(Date.now())});
        }),
        catchError(this.ErrorHandling<T>(url)),
        share()
      );
      this.cache.set(url, value);
      
      return value;
    }
    
  }

  post<T>(url:string, term:any, options?: any): Observable<T> {
    setTimeout(()=>APIService.pending++,0);
    return this.http.post<apiResponse<T>>(`${base_url}${url}`, term, this._mergeOptions(httpOptions, options)).pipe(
      finalize(() => APIService.pending--),
      tap((x)=>{
        if(!x.success) {
          throw {error: x};
        }
      }),
      map(x=>x.data),
      catchError(this.ErrorHandling<T>(url)),
      tap(
        () => {
          this.EraseCacheEntry(url); // Automate erase cache entry, for the resource that we just modified.
        }
      )
    );
  }

  put<T>(url:string, term:any, options?: any): Observable<T> {
    setTimeout(()=>APIService.pending++,0);
    return this.http.put<apiResponse<T>>(`${base_url}${url}`, term, this._mergeOptions(httpOptions, options)).pipe(
      finalize(() => APIService.pending--),
      tap((x)=>{
        if(!x.success) {
          throw {error: x};
        }
      }),
      map(x=>x.data),
      catchError(this.ErrorHandling<T>(url)),
      tap(
        () => {
          this.EraseCacheEntry(url);
        }
      )
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
      catchError(this.ErrorHandling<T>(url)),
      tap(
        () => {
          this.EraseCacheEntry(url);
        }
      )
    )
  }

  // We use this method when we want to merge the request data with the data from a file upload
  prepareUpload(file: File, body: any = {}, uploadName: string = 'upload') {
    let formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }

    if (file != null) 
      formData.append(uploadName, file, file.name);
    return formData;
  }

  private _mergeOptions(defaultOptions: any, requestOptions: any) {
    let options = {};
    for (var attrname in defaultOptions) 
      options[attrname] = defaultOptions[attrname];
    for (var attrname in requestOptions) 
      options[attrname] = requestOptions[attrname];
    return options;
  }
}



