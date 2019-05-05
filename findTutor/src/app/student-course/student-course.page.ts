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
  ordersdb = firebase.database().ref('orders/');
  student_courses: Array<any> =[];
  //student_courses=[];
  constructor(
    private router: Router,
    public itemService : ItemService,
    public events: Events
  ) { 
    
  }
  current_user = firebase.auth().currentUser;

  ngOnInit() {
    this.ordersdb.on('value', resp => {
      this.student_courses = [];
      this.student_courses = snapshotToArray_StudentCouse(resp);
      console.log(this.student_courses.length+" courses loaded");
      console.log(this.student_courses);

      this.events.publish('dataloaded',Date.now());
    });
    // console.log("ngOnInit ...");
    // console.log("courses no: "+this.student_courses.length)
    // if(this.student_courses  != undefined){
    //       console.log("couse length" + this.student_courses .length);
    // }
    // var self = this;
    // this.events.subscribe('dataloaded', (time) => {
    //   // user and time are the same arguments passed in `events.publish(user, time)`
    //   console.log('data load time:', time);
    //   self.student_courses = this.itemService.getStudentCourses();
    //   console.log("courses loaded: " + self.student_courses);
    //   });

    //   // load student course when construct the page
    //   this.student_courses  = this.itemService.getStudentCourses();
  }
  hideOrNot(value){
    if(value==="pending"|| value==="deny" || value==="s_rated"|| value==="rated")
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

export const snapshotToArray_StudentCouse = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
     // console.log("course own id" + item.ownerid);
     // console.log("current user: " + firebase.auth().currentUser.uid);
      if (item.student_id == firebase.auth().currentUser.uid){
          returnArr.push(item);
      }
  });

  return returnArr;
}