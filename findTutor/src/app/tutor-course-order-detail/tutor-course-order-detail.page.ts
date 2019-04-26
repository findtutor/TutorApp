import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';
import { CourseDetailPage } from '../course-detail/course-detail.page';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tutor-course-order-detail',
  templateUrl: './tutor-course-order-detail.page.html',
  styleUrls: ['./tutor-course-order-detail.page.scss'],
})
export class TutorCourseOrderDetailPage implements OnInit {
  img: String;
  private studentInfo;
  studentRating: number;
  course: any;
  quantity: number;
  studentid:String;

  userdb = firebase.database().ref('users/');
  studentUser: Array<any> =[];
  //studentUser: [];

  constructor(
    public router:Router,
    private route: ActivatedRoute,
 //   private itemService: ItemService,
    public events: Events
  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.course = param;
        console.log(this.course);
      }
    )
    console.log("course category is " + this.course.category);
    this.setCourseImage(this.course.category);
    
    this.studentid = this.course.student_id;
    console.log("student idddd: " + this.studentid);
    
    
    this.userdb.on('value', resp => {
      this.studentUser = [];
      this.studentUser = this.snapshotToArray_StudentInfo(resp);
      console.log(this.studentUser.length+" users loaded  ngoninit");
      console.log(this.studentUser+" users loaded  ngoninit");

      if(this.studentUser.length == 0){
        console.log("student user not in the user database");
        this.studentInfo = "student user not in the user database";
      }
    //  console.log(this.studentUser);
      this.events.publish('dataloaded',Date.now());
    });

    // console.log(this.studentUser + "student user isssss");
    // console.log(this.length_test + "student user length isssss");
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
  hideOrNot(rate_status, order_status){
    if((rate_status === 'false' )&& (order_status === 'accept'))
    {
      return false;
    }
    else{
      return true;
    }
  }
  goToRatingPage(course) {
    this.router.navigate(["/tutor-rate-student", course]);
  }

  goBack(){
    this.router.navigate(['/tutor/tutor-orders']);
  }

  snapshotToArray_StudentInfo = snapshot => {
   let returnArr = [];
    console.log("student idddd: " + this.studentid);
    snapshot.forEach(childSnapshot => {
    
        let item = childSnapshot.val();
        item.id = childSnapshot.key;
        if (item.id == this.studentid){
            console.log("item email is: " + item.email);
            this.studentInfo = item.email;
            returnArr.push(item);
        }
    });
   
    return returnArr;
  }
}







