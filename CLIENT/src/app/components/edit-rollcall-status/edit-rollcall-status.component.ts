import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReservationStatus } from 'src/app/interfaces/reservation';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'edit-rollcall-status',
  templateUrl: './edit-rollcall-status.component.html',
  styleUrls: ['./edit-rollcall-status.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditRollcallStatusComponent),
      multi: true
    }
  ]
})
export class EditRollcallStatusComponent implements OnInit {

  private _statuses: ReservationStatus[] = [
    ReservationStatus.PENDING,
    ReservationStatus.SHOW,
    ReservationStatus.NOSHOW,
    ReservationStatus.ORGANIZERCANCELLED,
  ];

  private _editing: boolean;

  private _innerValue: ReservationStatus = ReservationStatus.PENDING;

  private onTouchedCallback = () => {};
  private onChangeCallback: (_: any) => {};

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  label (v: ReservationStatus) {
    switch (v) {
      case ReservationStatus.SHOW : return 'Show';
      case ReservationStatus.NOSHOW : return 'No show';
      case ReservationStatus.ORGANIZERCANCELLED : return 'Cancelled';
      case ReservationStatus.PENDING : 
      default : return 'Pending';
    }
  }

  HTMLLabel (v: ReservationStatus) {
    switch (v) {
      case ReservationStatus.NOSHOW : return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: red;">${this.label(v)}</span>`);
      case ReservationStatus.SHOW : return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: green;">${this.label(v)}</span>`);
      case ReservationStatus.ORGANIZERCANCELLED :
      case ReservationStatus.PENDING : 
      default: return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: blue;">${this.label(v)}</span>`);
    }
  }

  edit () {
    this._editing = true;
    this.onTouchedCallback();
  }

  cancel () {
    this._editing = false;
  }

  selectStatus (status: ReservationStatus) {
    this._innerValue = status;
    if (status != ReservationStatus.PENDING) {
      this._editing = false;
      this.onChangeCallback(this._innerValue);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._innerValue = value;
    console.log(value);
    this._editing = (this._innerValue == ReservationStatus.PENDING);
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
