import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup(){
    console.log('Signup button clicked')
    this.router.navigate(["/signup"]);
  }

  tutorLogin(){
    console.log('tutorLogin button clicked')
    this.router.navigate(["/tutor"]);
  }

  studentLogin(){
    console.log('studentLogin button clicked')
    this.router.navigate(["/student"]);
  }

}
