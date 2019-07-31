import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  private _title: string = '';

  constructor() { }

  ngOnInit() {}

  // See :: https://medium.com/@sujeeshdl/angular-parent-to-child-and-child-to-parent-communication-from-router-outlet-868b39d1ca89
  onActivate(componentReference) {
    this._title = componentReference.title || '[ NO TITLE SET ]';
    //console.log(componentReference)
    //componentReference.anyFunction();
  }

}