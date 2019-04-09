import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { provideLocationStrategy } from '@angular/router/src/router_module';
//import { Observable } from 'rxjs';
//import * as firebase from 'Firebase';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  database: AngularFirestore;
  profiles: Observable<any[]>;
  
  profiledb = firebase.database().ref('profiles');

  myprofiles = [];
  myusers =[];
  usertype= "student"; //by default
  categories:Observable<any[]>;
  // courses:Observable<any[]>;
  // database: AngularFirestore;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
    ) {
      this.database = db;
      let profiles = db.collection('profiles').valueChanges();
      console.log("profiles = " + this.profiles);
      profiles.subscribe(items => {
        this.myprofiles = items;
        console.log("myprofiles = " + this.myprofiles); 
      });


      // this.database=db;
      // console.log("loading saved items and orders");
      // this.courses = db.collection('courses').valueChanges();
      this.categories = db.collection('categories').valueChanges();
      let users = db.collection('users').valueChanges();
      console.log(users);
      users.subscribe(items => {
        this.myusers = items;
        // this.mycartitems = snapshotToArray(items);
        console.log(this.myusers.length);
      });
     }

  // createCourse(name, price, description){
  //   let ownerid =firebase.auth().currentUser.uid;

  //   this.db.collection('/items').add({
  //     "ownerid":ownerid, 
  //     "name":name, 
  //     "price": price, 
  //     "description":description
  //   });
  // }

  getusertype(userid){
    // console.log(this.myusers.length +" users found");
    // console.log(userid);
    for (var i = this.myusers.length - 1; i >= 0; i--) {
      console.log(this.myusers[i].uid + " " + this.myusers[i].usertype);
      if(this.myusers[i].uid == userid){
        console.log(this.myusers[i].email +" "+this.myusers[i].usertype);
        this.usertype = this.myusers[i].usertype;
        return this.myusers[i].usertype;

      }
      
    }
  }
  getCategories(){
    console.log('getting categories...' + this.categories);
    return this.categories;
  }

  createUser(user) {
    console.error("creating user data with this information...\npassword: " + user.password + "\nemail: " + user.email + "\nusertype: " + user.usertype);

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("ERROR: " + errorMessage + "/nError Code: " + errorCode);
    });

    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
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
        console.log("user null");
      }
    });
  }

  getProfile(currentUser) {
    console.log("cur user  id is " + currentUser.id);// undefined
    for(let profile of this.myprofiles) {
      console.log("profile id hahahah = " + profile.id);// undefined!!!!!!
      console.log("profile username hahahah = " + profile.username);
      console.log("profile.uid = " + profile.uid);
      console.log("currentUser.uid = " + currentUser.uid);
      if(profile.uid == currentUser.uid) {
        return profile;
      }
    }
  }

  updateProfile(newProfile) {
    console.log("new profile id = " + newProfile.id);
    let newInfo = firebase.database().ref('profiles/' + newProfile.id).update(newProfile);
  }
}
