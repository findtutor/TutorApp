import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tutor-course',
  templateUrl: './tutor-course.page.html',
  styleUrls: ['./tutor-course.page.scss'],
})
export class TutorCoursePage implements OnInit {
 // private courses;
  coursesObservable:Observable<any[]>;
  courses:Array<any>=[];

  constructor(
    private router: Router,
    public itemService : ItemService,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) { 
      
    }
    current_user = firebase.auth().currentUser;
  
  ngOnInit() {

    this.coursesObservable = this.itemService.loadTutorCourse(this.current_user.uid);
    this.coursesObservable.subscribe(courses => {
      this.courses = courses;
        if(this.courses != undefined) {
        console.log('There are ' + this.courses.length + ' courses.');
        }
      })
    }

  addCourse(){
    console.log('add course button clicked')
    this.router.navigate(["/add-course"]);
  }

  courseDetailPage(course) {
    console.log('Course detail: ' + course);
  	this.router.navigate(["/course-detail", course]);
  }

  updateCourse(course){
    console.log('Update course: ' + course.name);
  	this.router.navigate(["/update-course", course]);
  }

  deleteCourse(course){
    console.log('Delete course: ' + course.name);
    this.itemService.deleteCourse(course.id)
  	this.router.navigate(['/tutor-course']);
  }
}
