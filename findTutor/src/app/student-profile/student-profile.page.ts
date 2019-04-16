import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

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
    this.profile  = this.itemservice.getProfile(curuser);
    if(this.profile  != undefined){
          console.log("profile " + this.profile);
    }
  }

  updateStudentProfile(profile){
    console.log("currrrrrr idddd = " + this.profile.id);// undefined
    this.router.navigate(["/edit-student-profile", profile]);
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
