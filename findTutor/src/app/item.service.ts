import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Observable } from 'rxjs';
//import * as firebase from 'Firebase';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  myusers =[];
  usertype= "student"; //by default
  categories:Observable<any[]>;
  // courses:Observable<any[]>;
  // database: AngularFirestore;

  constructor(public db: AngularFirestore,
    public afAuth: AngularFireAuth) {
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
      } else {
        console.log("user null");
      }
    });
  }
}
