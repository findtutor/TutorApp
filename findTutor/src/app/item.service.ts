import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  database: AngularFirestore;
  courses: Observable<any[]>;
  profileInfo:Observable<any[]>;
  categories:Observable<any[]>;
  myprofiles = [];
  myusers =[];
  mycourses = []
  usertype="student"; //by default

  profiledb = firebase.database().ref('profiles/');
  profiles: Array<any> =[];
  
  coursedb = firebase.database().ref('courses/');
  tutor_courses: Array<any> =[];
  category_courses: Array<any> =[];
  // database: AngularFirestore;

  ordersdb = firebase.database().ref('orders/');
  student_courses: Array<any> =[];
  tutor_orders: Array<any> =[];

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public events: Events
    ) {
      // bind profile value with id
      this.profiledb.on('value', resp => {
        this.profiles = [];
        this.profiles = snapshotToArray(resp);
        console.log(this.profiles.length+" items loaded");
        console.log(this.profiles);
        
        this.events.publish('dataloaded',Date.now());
      });


      // load profiles from firebase
      this.database = db;
      this.categories = db.collection('categories').valueChanges();

      // bind course value with id
      this.coursedb.on('value', resp => {
        this.tutor_courses = [];
        this.tutor_courses = snapshotToArray_TutorCouse(resp);
        console.log(this.tutor_courses.length+" courses loaded");
        console.log(this.tutor_courses);
  
        this.events.publish('dataloaded',Date.now());
      });

      //load student courses (orders)
      this.ordersdb.on('value', resp => {
        this.student_courses = [];
        this.student_courses = snapshotToArray_StudentCouse(resp);
        console.log(this.student_courses.length+" courses loaded");
        console.log(this.student_courses);
  
        this.events.publish('dataloaded',Date.now());
      });
      
      //load tutor orders
      this.ordersdb.on('value', resp => {
        this.tutor_orders = [];
        this.tutor_orders = snapshotToArray_TutorOrders(resp);
        console.log(this.tutor_orders.length+" courses loaded");
        console.log(this.tutor_orders);
  
        this.events.publish('dataloaded',Date.now());
      });

      //load courses by category
      this.coursedb.on('value', resp => {
        this.category_courses = [];
        this.category_courses = snapshotToArray_CategoryCouse(resp);
        console.log(this.category_courses.length+" courses loaded");
        console.log(this.category_courses);
  
        this.events.publish('dataloaded',Date.now());
      });

      // load users from firebase
      let users = db.collection('users').valueChanges();
      console.log(users);
      users.subscribe(items => {
        this.myusers = items;
        // this.mycartitems = snapshotToArray(items);
        console.log(this.myusers.length);
      });


     }


  // ********************************************************************
  // ************  User(tutor/student) related API: *********************
  // ********************************************************************
  getusertype(userid){
    // console.log(this.myusers.length +" users found");
    // console.log(userid);
    for (var i = this.myusers.length - 1; i >= 0; i--) {
      //console.log(this.myusers[i].uid + " " + this.myusers[i].usertype);
      if(this.myusers[i].uid == userid){
        console.log(this.myusers[i].email +" "+this.myusers[i].usertype);
        this.usertype = this.myusers[i].usertype;
        return this.myusers[i].usertype;

      }
      
    }
  }
 
  createUser(user) {
    console.log("creating user data with this information...\npassword: " + user.password + "\nemail: " + user.email + "\nusertype: " + user.usertype);

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("ERROR: " + errorMessage + "/nError Code: " + errorCode);
    });
    let hasCreated=false;
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser && hasCreated == true) {

          this.db.collection('/users').doc(firebaseUser.uid).set({
            "uid": firebaseUser.uid, 
            "email": user.email, 
            "usertype": user.usertype
          });
          console.log("created a new user...");


          let newProfile = firebase.database().ref('profiles').push();
          newProfile.set({
            "uid": firebaseUser.uid,
            "email": user.email,
            "image": "https://www.thesprucepets.com/thmb/KEkwV1YeL3obCMo0YSPDXTCxjRA=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/19933184_104417643500613_5541725731421159424_n-5ba0548546e0fb0050edecc0.jpg",
            "username": user.email,
            "contact_info": "unknown",
            "field": "unknown",
            "introduction": "unknown"
          })
      } else {
        hasCreated = true;
        console.log("user null");
      }
    });
  }

  // ********************************************************************
  // *****************  Profile related API: ****************************
  // ********************************************************************
  
  getProfile(currentUser) {
    console.log("cur user  uid is " + currentUser.uid);
    for(let profile of this.profiles) {
      if(profile.uid === currentUser.uid) {
        return profile;
      }
    }
  }

  getProfileByUid(uid) {
    for(let profile of this.profiles) {
      if(profile.uid === uid) {
        return profile;
      }
    }
  }

  updateProfile(newProfile) {
    let newInfo = firebase.database().ref('profiles/' + newProfile.id).update(newProfile);
  }


  // ********************************************************************
  // *****************  Course related API: *****************************
  // ********************************************************************
  createCourse(name, category, description, start_time, end_time, price) {
    let ownerid = firebase.auth().currentUser.uid;
    let newCourse = firebase.database().ref('courses').push();
    newCourse.set({
      "ownerid":ownerid, 
      "name":name, 
      "category":category, 
      "description":description,
      "start_time": start_time,
      "end_time": end_time,
      "price": price, 
    });
  }

  getTutorCourses(){
    return this.tutor_courses;
  }

  getStudentCourses(){
    return this.student_courses;
  }

  getTutorOrders(){
    return this.tutor_orders;
  }

  getCourseById(id) {
    for(let course of this.mycourses) {
      console.log("course.id = " + course.id);
      if(course.id === id) {
        console.log("found the course!!!!!!!");
        return course;
      }
    }
  } 

  getCategoryCourses(){
    return this.category_courses;
  }

  deleteCourse(courseid){
    firebase.database().ref('courses/').child(courseid).remove();
    console.log( 'Course deleted:' + courseid);
  }

  getCourses() {
    return this.courses;
  }

  // ********************************************************************
  // ****************** category related API: ***************************
  // ********************************************************************
  getCategories(){
    console.log('getting categories...' + this.categories);
    return this.categories;
  }

  // ********************************************************************
  // ********************* order related API: ***************************
  // ********************************************************************
  getEnrolled(course, quantity){
    // Find total price
    let total_price = quantity * course.price;
    let status = "pending";
    let curuser_id = firebase.auth().currentUser.uid;
    let newOrder = firebase.database().ref('orders').push();
    newOrder.set({
      "student_id":curuser_id, 
      "tutor_id":course.ownerid, 
      "course_id":course.id, 
      "total_price":total_price, 
      "unit_number":quantity,
      "status":status,
      "course_name":course.name,
      "start_time":course.start_time,
      "end_time":course.end_time,
      "order_id":newOrder.key,
    });
  }

}
// ********************************************************************
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
      // console.log(item);
      returnArr.push(item);
  });

  return returnArr;
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

export const snapshotToArray_CategoryCouse = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
     // console.log("course own id" + item.ownerid);
     // console.log("current user: " + firebase.auth().currentUser.uid);
      // if (item.ownerid == firebase.auth().currentUser.uid){
      //     returnArr.push(item);
      // }
      returnArr.push(item);
  });

  return returnArr;
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

export const snapshotToArray_TutorOrders = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
     // console.log("course own id" + item.ownerid);
     // console.log("current user: " + firebase.auth().currentUser.uid);
      if (item.tutor_id == firebase.auth().currentUser.uid){
          returnArr.push(item);
      }
  });

  return returnArr;
}
