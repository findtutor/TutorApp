import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editCourse(){
    console.log('update course button clicked')
    this.router.navigate(["/update-course"]);
  }

}
