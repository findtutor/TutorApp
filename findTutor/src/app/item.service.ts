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
  
  // database: AngularFirestore;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public events: Events
    ) {
      // bind object value with id
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
      this.courses = db.collection('courses').valueChanges();
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
    let hasCreated=false;
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser && hasCreated == true) {

          this.db.collection('/users').add({
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
    console.log("new profile id ===== " + newProfile.id);
    let newInfo = firebase.database().ref('profiles/' + newProfile.id).update(newProfile);
  }


  // ********************************************************************
  // *****************  Course related API: *****************************
  // ********************************************************************
  createCourse(name, category, description, start_time, end_time, price) {
    let ownerid = firebase.auth().currentUser.uid;
    let courseId = this.db.collection('courses').ref.doc().id;
    console.log("pre generated course id: " + courseId);
    this.db.collection('courses').doc(courseId).set({
  //  this.db.collection('courses').add({
      "ownerid":ownerid, 
      "name":name, 
      "category":category, 
      "description":description,
      "start_time": start_time,
      "end_time": end_time,
      "price": price, 
      "courseid":courseId,
    });
  }

  getCourses() {
    console.log('return the entire courses from db...');
    return this.courses;
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
    //let newInfo = firebase.database().ref('courses/' + courseid).remove();
   // firebase.database().ref('courses/').child(courseid).remove();
    firebase.database().ref('courses/').child(courseid).remove();
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

