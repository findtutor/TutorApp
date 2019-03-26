import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.page.html',
  styleUrls: ['./tutor-profile.page.scss'],
})
export class TutorProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  updateTutorProfile(){
    console.log('edit student profile button clicked')
    this.router.navigate(["/edit-tutor-profile"]);
  }
}
