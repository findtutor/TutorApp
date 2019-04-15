import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

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
    public afAuth: AngularFireAuth,
    public events: Events
  ) { 
    let curuser = firebase.auth().currentUser;
    var self = this;
    events.subscribe('dataloaded', (time) => {
    self.profile= this.itemservice.getProfile(curuser);
    console.log("profile loaded: " + self.profile.name);
    });
  }

  ngOnInit() {
    let curuser =firebase.auth().currentUser;
    // this.getUserProfile(curuser);
    this.profile  = this.itemservice.getProfile(curuser);
    if(this.profile  != undefined){
          console.log("profile " + this.profile);
    }
  }

  updateTutorProfile(profile){
    this.router.navigate(["/edit-tutor-profile", profile]);
  }

  getUserProfile(curuser) {
    this.profile = this.itemservice.getProfile(curuser);
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
