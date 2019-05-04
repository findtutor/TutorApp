import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
import { TutorPageRoutingModule } from '../tutor/tutor.router.module';

@Component({
  selector: 'app-student-course-order-detail',
  templateUrl: './student-course-order-detail.page.html',
  styleUrls: ['./student-course-order-detail.page.scss'],
})
export class StudentCourseOrderDetailPage implements OnInit {
  img: String;
  private tutorInfo;
  tutorRating: any;
  course: any;
  status: boolean;
  tutorid:String;

  userdb = firebase.database().ref('users/');
  studentratingdb = firebase.database().ref('studentratings/');
  tutorUser: Array<any> =[];
  studentRating:Array<any> =[];

  constructor(
    public router:Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    public events: Events
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.course = param;
        console.log(this.course);
      }
    )
    console.log("course category is " + this.course.category);
    this.setCourseImage(this.course.category);
    if(this.course.status ==="pending") {
      this.status = false;
    }
    else {
       this.status = true;
      }
    
    this.tutorid = this.course.tutor_id;
    this.userdb.on('value', resp => {
        this.tutorUser = [];
        this.tutorUser = this.snapshotToArray_TutorInfo(resp);
        console.log(this.tutorUser.length+" users loaded  ngoninit");
        console.log(this.tutorUser+" users loaded  ngoninit");
  
        if(this.tutorUser.length == 0){
          console.log("tutor user not in the user database");
          this.tutorInfo = "tutor user not in the user database";
        }
      //  console.log(this.studentUser);
        this.events.publish('dataloaded',Date.now());
      });


      this.studentratingdb.on('value', resp => {
        this.studentRating = [];
        this.studentRating = this.snapshotToArray_TutorRating(resp);
        console.log(this.studentRating.length+" rating loaded  ngoninit");
        console.log(this.studentRating+" ranting loaded  ngoninit");
  
        if(this.studentRating.length == 0){
          console.log("tutor user not rated yet");
          //this.tutorRating = "tutor user not rated yet";
        }
      //  console.log(this.studentUser);
        this.events.publish('dataloaded',Date.now());
      });
  }

  setCourseImage(courseType) {
    switch (courseType) {
      case "computer_science": {
        this.img = "https://s3.amazonaws.com/msoe/files/callouts/wide_sml_computer-science-landing-page.jpg";
        break;
      }
      case "mathematics": {
        this.img = "https://www.monash.edu/__data/assets/image/0005/848561/17P-0341-Making-sense-of-the-world-Feature-box.jpg";
        break;
      }
      case "business": {
        this.img = "http://lmc123.com/images/pages/business-strategy.jpg";
        break;
      }
      case "training": {
        this.img = "http://lakevue.com/wp-content/uploads/2013/04/personal-trainer.jpg";
        break;
      }
      case "physics": {
        this.img = "http://snagfilms-a.akamaihd.net/b6/f5/105549274aa399567d3082c9b3db/1280-physics-2x.jpg";
        break;
      }
      case "chemistry": {
        this.img = "https://www.thoughtco.com/thmb/-kvl9EVbWRkDOdNIfJ4c14KcBho=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/formulas-157378066-56ed562c3df78ce5f836b8e6.jpg";
        break;
      }
      // TODOS: when add new course category, add new cooresponding img also!!!
    }
  }
  goToRatingPage(course) {
    this.router.navigate(["/student-rate-tutor", course]);
  }
  hideOrNot(rate_status, order_status){
    if((rate_status === 'false' )&& (order_status === 'accept'))
    {
      return false;
    }
    else{
      return true;
    }
}

  goBack(){
    this.router.navigate(['/student/student-course']);
  }

  snapshotToArray_TutorInfo = snapshot => {
    let returnArr = [];
     console.log("tutor idddd: " + this.tutorid);
     snapshot.forEach(childSnapshot => {
     
         let item = childSnapshot.val();
         item.id = childSnapshot.key;
         if (item.id == this.tutorid){
             console.log("item email is: " + item.email);
             this.tutorInfo = item.email;
             returnArr.push(item);
         }
     });
    
     return returnArr;
   }

   snapshotToArray_TutorRating = snapshot => {
    let returnArr = [];
    let count = 0;
     console.log("tutor idddd: " + this.tutorid);
     snapshot.forEach(childSnapshot => {
     
         let item = childSnapshot.val();
         item.id = childSnapshot.key;
         if (item.tutor_id == this.tutorid){
             console.log("tutor id found: " + item.tutor_id);
             //this.tutorRating = Number(this.tutorRating) + Number(item.rating);
             this.tutorRating = item.rating;
             console.log("cumulative rating: " + this.tutorRating);
             count = count + 1;
             returnArr.push(item);
         }
     });
     this.tutorRating = this.tutorRating/count;
     console.log("average rating: " + this.tutorRating);
    
     return returnArr;
   }

}
