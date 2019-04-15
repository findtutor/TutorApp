import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
//import { Observable } from 'rxjs'; 
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tutor-course',
  templateUrl: './tutor-course.page.html',
  styleUrls: ['./tutor-course.page.scss'],
})
export class TutorCoursePage implements OnInit {
  
  tutor_courses=[
  ];

  constructor(
    private router: Router,
    public itemService : ItemService,
   // public db: AngularFirestore,
   // public afAuth: AngularFireAuth,
    public events: Events) { 
      var self = this;
      events.subscribe('dataloaded', (time) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('data load time:', time);
        self.tutor_courses = this.itemService.getTutorCourses();
        console.log("courses loaded: " + self.tutor_courses);
        });
    }
    current_user = firebase.auth().currentUser;


  ngOnInit() {

    console.log("ngOnInit ...");
    this.tutor_courses  = this.itemService.getTutorCourses();
    console.log("courses no: "+this.tutor_courses.length)
    if(this.tutor_courses  != undefined){
          console.log("couse length" + this.tutor_courses .length);
    }
  }

  addCourse(){
    console.log('add course button clicked')
    this.router.navigate(["/add-course"]);
  }

  courseDetailPage(course) {
    console.log('Course detail: ' + course);
  	this.router.navigate(["/course-detail", course]);
  }

  // updateCourse(course){
  //   console.log('Update course: ' + course.name);
  // 	this.router.navigate(["/update-course", course]);
  // }

  // deleteCourse(course){
  //   console.log('Delete course: ' + course.name);
  //   this.itemService.deleteCourse(course.courseid);
  // 	this.router.navigate(['/tutor-course']);
  // }

  deleteCourse(course){
    let newInfo = firebase.database().ref('courses/'+course.id).remove();
    console.log("Course deleted:"+course.id)
}
//   deleteCourse(id){
//     let newInfo = firebase.database().ref('courses/'+id).remove();
//     console.log("Course deleted:"+id)
// }

  
}
