import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  updateStudentProfile(){
    console.log('edit student profile button clicked')
    this.router.navigate(["/edit-student-profile"]);
  }

}
