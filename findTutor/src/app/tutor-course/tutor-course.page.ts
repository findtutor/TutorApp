import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-course',
  templateUrl: './tutor-course.page.html',
  styleUrls: ['./tutor-course.page.scss'],
})
export class TutorCoursePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addCourse(){
    console.log('add course button clicked')
    this.router.navigate(["/add-course"]);
  }

}
