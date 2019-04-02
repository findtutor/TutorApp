import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login_form: FormGroup;
  userdb = firebase.database().ref('users/');

  
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ) { 
    
  }

  ngOnInit() {
    this.login_form = this.formBuilder.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('', Validators.required)
    });
  }

  signup(){
    console.log('Signup button clicked')
    this.router.navigate(["/signup"]);
  }

  login(item){
    // console.log("Email: "+item.email+"\nPassword:  "+item.password)
    var self=this;
    var email=item.email;
    var password=item.password;
    var usertype = item.usertype;
    var error_exist = 0; 
    console.log(email+"   "+password);
    console.log(usertype);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      error_exist = 1;
      console.log(errorCode);
  
      if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');    
      } else if (errorCode === 'auth/user-not-found'){
          alert("User does not exist");    
      }
      console.log(error);
      }
    ).then(function(result){

          let userid =firebase.auth().currentUser.uid;
          console.log(userid +" logged in")

          let user_type = self.itemService.getusertype(userid);
          console.log("user type is: " + user_type);

          if (usertype=="tutor" && user_type=="tutor" && error_exist == 0){
            console.log('go to the tutor interface');
            console.log(error_exist);
            self.router.navigate(["/tutor"]);
          } else if (usertype=="student" && user_type=="student" && error_exist == 0){
            console.log('go to the student interface');
            self.router.navigate(["/student"]);
          } else{
            console.log("must select one user type");
          }
    });

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
