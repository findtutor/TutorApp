import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.page.html',
  styleUrls: ['./student-course.page.scss'],
})
export class StudentCoursePage implements OnInit {
 
  student_courses=[
  ];
  constructor(
    private router: Router,
    public itemService : ItemService,
    public events: Events
  ) { 
    var self = this;
    events.subscribe('dataloaded', (time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('data load time:', time);
      self.student_courses = this.itemService.getStudentCourses();
      console.log("courses loaded: " + self.student_courses);
      });

      // load student course when construct the page
      this.student_courses  = this.itemService.getStudentCourses();
  }
  current_user = firebase.auth().currentUser;

  ngOnInit() {
    // console.log("ngOnInit ...");
    // console.log("courses no: "+this.student_courses.length)
    // if(this.student_courses  != undefined){
    //       console.log("couse length" + this.student_courses .length);
    // }
  }
  hideOrNot(value){
    if(value==="pending"|| value==="deny" || value==="rated")
      return true;
    else return false;
  }

  studentCourseOrderDetail(course){
    this.router.navigate(["/student-course-order-detail", course]);
  }
  studentRateTutor(course)
  {
    this.router.navigate(["/student-rate-tutor", course]);
  }

}
