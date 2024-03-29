import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';

@Component({
  templateUrl: './classeslist.component.html',
  styleUrls: ['./classeslist.component.css']
})
export class ClasseslistComponent implements OnInit {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  courseId: string =  this.activateRoute.snapshot.paramMap.get("id");

  classes: Class[] = [];

  private _search: string = '';

  constructor(private classService: ClassesService,
    private activateRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    if (this.courseId == null) return;
    if (this.classes.length > 0)
      this.datatable.destroy();
    this.classService.getFromCourse(this.courseId).subscribe((classes) => {
      this.classes = classes;
      if (this.classes.length > 0)
        setTimeout(() => { 
          this.datatable.load(); 
          this.search('');
        }, 0);
    });
  }

  receiveCourseId(Eventarg) {
    let reload = this.courseId != null;
    this.courseId = Eventarg;

    // Si courseId ERA nul quan canviem de ruta s'activarà ngOnInit.
    // En canvi si courseId NO ERA nul el navigateByUrl no activarà ngOnInit.
    if (reload)
      this.getAll();
    
    this.route.navigateByUrl(`/main/schedules-list/${this.courseId}`);
  }

  classConfirm(c:Class) {
    this.classService.confirm(c.id).subscribe( () => {
      //this.classes.find((c: Class) => c.id == id).confirmationSent = true;
      c.confirmationSent = true;
    });
  }

  search (v: string) {
    this._search = v;
    this.datatable.search(this._search);
  }

  hasToRollcall (c: Class) {
    return this._classStarted(c) && !(<any>c).rollcall && (<any>c).numReserves > 0;
  }

  canReschedule (c: Class) {
    return this._classStarted(c) && (<any>c).numReserves == 0; 
  }

  canEdit (c: Class) {
    return !this._classStarted(c) || (<any>c).numReserves == 0; 
  }

  canStatistics (c: Class) {
    return (<any>c).numReserves > 0
  }

  canConfirm (c: Class) {
    return !this._classStarted(c) && !( c.confirmationSent);
  }

  private _classStarted (c: Class) {
    let now = (Date.now()/1000) | 0;
    return (c.tsIni <= now);
  }

  classDetails (c: Class) {
    window.open(`https://reserve.myspotbook.com/class/${c.id}`, 'blank');
  }
}
