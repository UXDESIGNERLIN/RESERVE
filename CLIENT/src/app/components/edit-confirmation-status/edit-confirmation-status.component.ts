import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfirmationStatus } from 'src/app/interfaces/reservation';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'edit-confirmation-status',
  templateUrl: './edit-confirmation-status.component.html',
  styleUrls: ['./edit-confirmation-status.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditConfirmationStatusComponent),
      multi: true
    }
  ]
})
export class EditConfirmationStatusComponent implements OnInit {

  private _statuses: ConfirmationStatus[] = [
    ConfirmationStatus.PENDING,
    ConfirmationStatus.CONFIRMED,
    ConfirmationStatus.UNSURE
  ];

  private _editing: boolean;

  private _innerValue: ConfirmationStatus = ConfirmationStatus.PENDING;

  private onTouchedCallback = () => {};
  private onChangeCallback: (_: any) => {};

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  label (v: ConfirmationStatus) {
    switch (v) {
      case ConfirmationStatus.UNSURE : return 'Not sure';
      case ConfirmationStatus.CONFIRMED : return 'Confirmed';
      case ConfirmationStatus.PENDING : 
      default : return 'Pending';
    }
  }

  HTMLLabel (v: ConfirmationStatus) {
    switch (v) {
      case ConfirmationStatus.UNSURE : return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: red;">${this.label(v)}</span>`);
      case ConfirmationStatus.CONFIRMED : return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: green;">${this.label(v)}</span>`);
      case ConfirmationStatus.PENDING : 
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

  selectStatus (status: ConfirmationStatus) {
    this._innerValue = status;
    this._editing = false;
    this.onChangeCallback(this._innerValue);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._innerValue = value;
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
