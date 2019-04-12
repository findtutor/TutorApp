import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  database: AngularFirestore;
  profiles: Observable<any[]>;
  courses: Observable<any[]>;
  profileInfo:Observable<any[]>;
  categories:Observable<any[]>;
  myprofiles = [];
  myusers =[];
  mycourses = []
  usertype="student"; //by default

  profiledb = firebase.database().ref('profiles');
  
  // database: AngularFirestore;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
    ) {
      // load profiles from firebase
      this.database = db;
      this.categories = db.collection('categories').valueChanges();
      let profiles = db.collection('profiles').valueChanges();
      console.log("profiles = " + profiles);
      profiles.subscribe(items => {
        this.myprofiles = items;
        console.log("myprofiles = " + this.myprofiles); 
      });

      // load courses from firebase
      let courses = db.collection('courses').valueChanges();
      console.log("courses = " + courses);
      courses.subscribe(items => {
        this.mycourses = items;
        console.log("mycourses = " + this.mycourses); 
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

    let hasCreated = false;
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser && hasCreated == true) {
          this.db.collection('/users').add({
            "uid": firebaseUser.uid, 
            "email": user.email, 
            "usertype": user.usertype
          });
          console.log("created a new user...");
          
          // create a default profile when user first signup
          this.db.collection('/profiles').add({
            "uid": firebaseUser.uid,
            "email": user.email,
            "image": "https://www.thesprucepets.com/thmb/KEkwV1YeL3obCMo0YSPDXTCxjRA=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/19933184_104417643500613_5541725731421159424_n-5ba0548546e0fb0050edecc0.jpg",
            "username": user.email,
            "contact_info": "unknown",
            "field": "unknown",
            "introduction": "unknown"
          });
          console.log("cloud saved profile");  
          
      } else {
        hasCreated = true;
        console.log("user null");
      }
    });
  }

  // ********************************************************************
  // *****************  Profile related API: *****************************
  // ********************************************************************
  
  getProfile(currentUser) {
    console.log("cur user  id is " + currentUser.uid);// undefined
    for(let profile of this.myprofiles) {
     // console.log("profile id hahahah = " + profile.id);// undefined!!!!!!
     // console.log("profile username hahahah = " + profile.username);
     // console.log("profile.uid = " + profile.uid);
     // console.log("currentUser.uid = " + currentUser.uid);
      if(profile.uid == currentUser.uid) {
        return profile;
      }
    }
  }

  updateProfile(newProfile) {
    console.log("new profile id = " + newProfile.uid);
   // let newInfo = firebase.database().ref('profiles/' + newProfile.uid).update(newProfile);
   let newInfo = firebase.database().ref('profiles/' + newProfile.uid).update(newProfile);
  }
  // ********************************************************************
  // *****************  Course related API: *****************************
  // ********************************************************************
  createCourse(name, category, description, start_time, end_time, price) {
    let ownerid = firebase.auth().currentUser.uid;
    this.db.collection('courses').add({
      "ownerid":ownerid, 
      "name":name, 
      "category":category, 
      "description":description,
      "start_time": start_time,
      "end_time": end_time,
      "price": price, 
    });
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

  loadTutorCourse(currentuserid) {
    console.log("cur user  id is " + currentuserid);// undefined
    this.courses = this.database.collection('courses',ref => ref.where('ownerid', '==', currentuserid)).valueChanges();
    return this.courses;
  }

  deleteCourse(courseid){
    let newInfo = firebase.database().ref('courses/' + courseid).remove();
    console.log( 'Course deleted:' + courseid);
  }


  // ********************************************************************
  // *****************  category related API: *****************************
  // ********************************************************************
  getCategories(){
    console.log('getting categories...' + this.categories);
    return this.categories;
  }
}

