import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'picture-uploader',
  templateUrl: './picture-uploader.component.html',
  styleUrls: [ './picture-uploader.component.css' ],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PictureUploaderComponent),
      multi: true
    },
  ]
})
export class PictureUploaderComponent implements OnInit, ControlValueAccessor {
  
  private _src: string; // = require('../../../assets/img/profile-default.png');
  private _hover: boolean = false;

  public get src() { return this._src; }
  public set src(v: string) {
    this._src = v;
    //this.propagateChange(this._src);
  }

  private _over(e: any) {
    if (e != null) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
    this._hover = true;
  }

  private _out() {
    this._hover = false;
  }

  private _triggerFileSelect() {
    let fInput = document.createElement('input');
    fInput.type = 'file';
    fInput.accept = '.jpg,.jpeg,.png,.gif';
    fInput.onchange = (e:Event) => {
      if (e.target) {
        this._handleFiles((e.target as any).files[0]);
      }
      else {
        this._handleFiles((e.srcElement as any).files[0]);
      }
    }
    fInput.click();
  }

  private _handleFileDrop(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    this._handleFiles((e as any).dataTransfer.files[0]);
  }

  private _handleFiles(f: File) {
    let FR = new FileReader();
    FR.onload = (e:Event) => {
      //let i = new Image();
      //i.src = FR.result.toString();


      this.src = FR.result.toString();

      //console.log(i.src);
      /*
      this._modalService.openModal(new ModalItem("editPicture", EditPictureModal, {img: i}));
      this._modalService.modalFinish$
        .filter((v: {id: string, result: any}) => v.id == 'editPicture')
        .subscribe((v) => {
          this.src = v.result;
        });
      */
    }
    FR.readAsDataURL(f);
    this.propagateChange(f);
  }

  constructor( 
  ) { }

  ngOnInit() { }

  writeValue(value: string) {
    if (value == null || typeof value != "string") {
      this.src = null; //require('../../../assets/img/profile-default.png');
    }
    else {
      this.src = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}

