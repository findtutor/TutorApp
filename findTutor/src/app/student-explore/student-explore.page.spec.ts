import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExplorePage } from './student-explore.page';

describe('StudentExplorePage', () => {
  let component: StudentExplorePage;
  let fixture: ComponentFixture<StudentExplorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExplorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExplorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
