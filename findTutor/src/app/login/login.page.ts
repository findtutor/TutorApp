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
  users2: Array<any> =[];
  
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
   // this.userdb = firebase.database().ref('users/');

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
          
                //load users
          let users = [];
           self.userdb.on('value', resp => {   
              //let users = [];
              users = self.snapshotToArray_Users(resp);
              console.log(users.length+" users loaded...");
              console.log(users);
  
              //this.events.publish('dataloaded',Date.now());
         });
         //console.log(users);
         self.users2 = users;
         console.log(self.users2 + "users 2");
         // let user_type = self.itemService.getusertype(userid);
          let user_type = self.getusertype(userid);
          console.log("user type is: " + user_type);

          if (usertype === "tutor" && user_type === "tutor" && error_exist == 0){
            console.log('go to the tutor interface');
            console.log(error_exist);
            self.router.navigate(["/tutor"]);
          } else if (usertype ==="student" && user_type ==="student" && error_exist == 0){
            console.log('go to the student interface');
            self.router.navigate(["/student"]);
          } else{
            alert("must select one user type");
          } 
    });

  }


  getusertype(userid){
    // console.log(this.myusers.length +" users found");
    console.log(userid);
    console.log("current user " + this.users2);

    for(let user of this.users2) {
      if(user.uid === userid) {
        console.log("user type is " + user.usertype);
        return user.usertype;
      }
    }
    
    return "users_not_found";
  }

  snapshotToArray_Users = snapshot => {
    let returnArr = [];
  
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.id = childSnapshot.key;
       // console.log("course own id" + item.ownerid);
        console.log("current user: " + firebase.auth().currentUser.uid);
        if (item.id == firebase.auth().currentUser.uid){
            returnArr.push(item);
        }
    });
  
    return returnArr;
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
