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
  }
  current_user = firebase.auth().currentUser;

  ngOnInit() {
    console.log("ngOnInit ...");
    this.student_courses  = this.itemService.getStudentCourses();
    console.log("courses no: "+this.student_courses.length)
    if(this.student_courses  != undefined){
          console.log("couse length" + this.student_courses .length);
    }
  }

}
