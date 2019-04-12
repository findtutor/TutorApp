import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.page.html',
  styleUrls: ['./tutor-profile.page.scss'],
})
export class TutorProfilePage implements OnInit {

  private profile;

  constructor(
    private router: Router,
    public itemservice : ItemService,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    let curuser =firebase.auth().currentUser;
    console.log("currrrrrr uid = " + curuser.uid);
    this.getUserProfile(curuser);
    console.log("profilllllle uid = " + this.profile.uid);// undefined
  }

  updateTutorProfile(profile){
    console.log('edit tutor profile button clicked');
    console.log("currrrrrr idddd = " + this.profile.uid);// undefined
    this.router.navigate(["/edit-tutor-profile", profile]);
  }

  getUserProfile(curuser) {
    this.profile = this.itemservice.getProfile(curuser);
    console.log("profile is " + this.profile);
    console.log("profile  username is " + this.profile.username);
    console.log("profile introduction is " + this.profile.introduction);
    console.log("profile uiddddd is " + this.profile.uid);// undefined
  }

  logout() {
    let cur_user = firebase.auth().currentUser;
    if(cur_user != null) {
      firebase.auth().signOut().then(function() {
        console.log("logout successfully!");
        
      }, function(error) {
         console.log(error);
      });
    } else {
      console.log("No user signed in now!");
    }
    this.router.navigate(['/login']);
  }

}
