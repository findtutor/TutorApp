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
    console.log("profilllllle id = " + this.profile.id);// undefined
  }

  updateTutorProfile(profile){
    console.log('edit tutor profile button clicked');
    console.log("currrrrrr idddd = " + this.profile.id);// undefined
    this.router.navigate(["/edit-tutor-profile", profile]);
  }

  getUserProfile(curuser) {
    this.profile = this.itemservice.getProfile(curuser);
    console.log("profile is " + this.profile);
    console.log("profile  username is " + this.profile.username);
    console.log("profile introduction is " + this.profile.introduction);
    console.log("profile iddddd is " + this.profile.id);// undefined
  }
}
