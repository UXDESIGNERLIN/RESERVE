import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrls: [ './date-time.component.css' ],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeComponent),
      multi: true
    },
  ]
})
export class DateTimeComponent implements OnInit, ControlValueAccessor {

  private days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  private years = [2019, 2020, 2021, 2022, 2023];
  private hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  private minutes = [0,5,10,15,20,25,30,35,40,45,50,55];

  private _parseHours (v: number) {
    let c24h = ('00'+v).substr(-2);
    let meridien = (v >= 12) ? 'PM' : 'AM';
    let c12h = ((v%12 == 0) ? 12 : v%12) + ' ' + meridien;
    return `${c24h} (${c12h})`;
  }

  private _parseMinutes (v: number) {
    return ('00'+v).substr(-2);
  }

  private _dateParams = {
    day: null,
    month: null,
    year: null,
    hour: null,
    minute: null,
  }

  private _modernBrowser = true;
  
  private _ts: number;

  private _error: boolean = false;

  get datetime () {
    return (this._ts) ? (new Date(this._ts)).toISOString().substr(0,16) : null;
  }

  set datetime (v: string) {
    // Quan la data és invalida el datetime-local input ens envia un valor buit
    if (v == null || v == '') {
      this._error = this._error || (this._ts != null);
      this.propagateChange(null);
    }
    else {
      this._error = false;
      this._ts = +new Date(v)-(new Date()).getTimezoneOffset()*60*1000;
      this.propagateChange((this._ts/1000) | 0);
    }
  }

  private _setDateTime(f: string, v: number) {
    this._dateParams[f] = v;
    if (['year', 'month', 'day'].map(v => this._dateParams[v]).filter(v => v == null).length == 0) {
      let d = new Date();
      d.setFullYear(this._dateParams.year);
      d.setMonth(this._dateParams.month - 1);
      d.setDate(this._dateParams.day);

      this._dateParams.year = d.getFullYear();
      this._dateParams.month = d.getMonth() + 1;
      this._dateParams.day = d.getDate();

      if (['hour', 'minute'].map(v => this._dateParams[v]).filter(v => v == null).length == 0) {
        d.setHours(this._dateParams.hour);
        d.setMinutes(this._dateParams.minute);
        d.setSeconds(0,0);
        this._dateParams.hour = d.getHours();
        this._dateParams.minute = d.getMinutes();

        this.datetime = d.toISOString().substr(0,16);
      }
    }
  }

  constructor( 
  ) { }

  ngOnInit() {
    let test = document.createElement('input');
    test.type = 'datetime-local';
    this._modernBrowser = (test.type === 'datetime-local');
  }

  writeValue(value: number) {
    if (value == null || typeof value != "number" || !Number.isFinite(value) || !Number.isInteger(value) || Number.isNaN(value)) {
      this._ts = null;
      ['year', 'month', 'day', 'hour', 'minute'].forEach(v => {
        this._dateParams[v] = null;
      });
    }
    else {
      this._ts = value*1000;
      let d = new Date(value*1000);
      this._dateParams.year = d.getFullYear();
      this._dateParams.month = d.getMonth() + 1;
      this._dateParams.day = d.getDate();
      this._dateParams.hour = d.getHours();
      this._dateParams.minute = d.getMinutes();
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}

