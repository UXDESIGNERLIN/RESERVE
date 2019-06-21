import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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

  private _editing: boolean;

  private _innerValue: 'pending' | 'confirmed' | 'unconfirmed' = 'pending';

  private onTouchedCallback = () => {};
  private onChangeCallback: (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  label (v: 'pending' | 'confirmed' | 'unconfirmed') {
    switch (v) {
      case 'unconfirmed' : return 'Not sure';
      case 'confirmed' : return 'Confirmed';
      case 'pending' : 
      default : return 'Pending';
    }
  }

  edit () {
    this._editing = true;
    this.onTouchedCallback();
  }

  cancel () {
    this._editing = false;
  }

  selectStatus (status: 'pending' | 'confirmed' | 'unconfirmed') {
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
