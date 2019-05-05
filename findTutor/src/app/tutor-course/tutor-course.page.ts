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
  
  coursedb = firebase.database().ref('courses/');
  tutor_courses: Array<any> =[];
  //tutor_courses=[ ];

  constructor(
    private router: Router,
    public itemService : ItemService,
   // public db: AngularFirestore,
   // public afAuth: AngularFireAuth,
    public events: Events) { 
          // bind course value with id
          this.coursedb.on('value', resp => {
            this.tutor_courses = [];
            this.tutor_courses = snapshotToArray_TutorCouse(resp);
            console.log(this.tutor_courses.length+" courses loaded");
            console.log(this.tutor_courses);
      
            this.events.publish('dataloaded',Date.now());
          });
    }
    current_user = firebase.auth().currentUser;


  ngOnInit() {

    // var self = this;
    //   this.events.subscribe('dataloaded', (time) => {
    //     // user and time are the same arguments passed in `events.publish(user, time)`
    //     console.log('data load time:', time);
    //     self.tutor_courses = this.itemService.getTutorCourses();
    //     console.log("courses loaded: " + self.tutor_courses);
    //     });

    // console.log("ngOnInit ...");
    // this.tutor_courses  = this.itemService.getTutorCourses();
    // console.log("courses no: "+this.tutor_courses.length)
    // if(this.tutor_courses  != undefined){
    //       console.log("couse length" + this.tutor_courses .length);
    // }
  }

  addCourse(){
    console.log('add course button clicked')
    this.router.navigate(["/add-course"]);
  }

  courseDetailPage(course) {
    console.log('Course detail: ' + course);
  	this.router.navigate(["/course-detail", course]);
  }

  deleteCourse(course){
    let newInfo = firebase.database().ref('courses/'+course.id).remove();
    console.log("Course deleted:"+course.id)
  }
  
}

export const snapshotToArray_TutorCouse = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
     // console.log("course own id" + item.ownerid);
     // console.log("current user: " + firebase.auth().currentUser.uid);
      if (item.ownerid == firebase.auth().currentUser.uid){
          returnArr.push(item);
      }
  });

  return returnArr;
}