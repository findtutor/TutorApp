import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // courses:Observable<any[]>;
  // database: AngularFirestore;

  constructor(public db: AngularFirestore,
    public afAuth: AngularFireAuth) {
      // this.database=db;
      // console.log("loading saved items and orders");
      // this.courses = db.collection('courses').valueChanges();
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
