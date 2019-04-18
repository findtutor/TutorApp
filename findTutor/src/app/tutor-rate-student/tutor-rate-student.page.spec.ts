import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRateStudentPage } from './tutor-rate-student.page';

describe('TutorRateStudentPage', () => {
  let component: TutorRateStudentPage;
  let fixture: ComponentFixture<TutorRateStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorRateStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRateStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
