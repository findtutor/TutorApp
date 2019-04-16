import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoursePage } from './update-course.page';

describe('UpdateCoursePage', () => {
  let component: UpdateCoursePage;
  let fixture: ComponentFixture<UpdateCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
