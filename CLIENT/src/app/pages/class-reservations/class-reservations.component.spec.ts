import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassReservationsComponent } from './class-reservations.component';

describe('ClassReservationsComponent', () => {
  let component: ClassReservationsComponent;
  let fixture: ComponentFixture<ClassReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
