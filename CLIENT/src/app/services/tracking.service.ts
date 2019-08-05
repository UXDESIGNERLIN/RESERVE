import { Injectable } from '@angular/core';
import { APIService } from './API.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor (private apiservice: APIService) { }

  getPendingRollCall () {
    return this.apiservice.get(`rollcall`);
  }
}
