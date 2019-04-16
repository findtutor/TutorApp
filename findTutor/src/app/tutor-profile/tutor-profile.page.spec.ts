import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfilePage } from './tutor-profile.page';

describe('TutorProfilePage', () => {
  let component: TutorProfilePage;
  let fixture: ComponentFixture<TutorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
