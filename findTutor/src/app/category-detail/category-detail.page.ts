import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { ItemService } from '../item.service';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {
  category_courselist=[];
  constructor( //private route: ActivatedRoute,
               private router: Router,
               public itemService: ItemService,
              // public navCtrl: NavController,
               public events: Events) {
    console.log('category detail page constructed');

    var self = this;
      events.subscribe('dataloaded', (time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('courselist load time:', time);
      self.category_courselist = this.itemService.getCategoryCourses();
      console.log("courses loaded: " + self.category_courselist);
    });

  }
  current_user = firebase.auth().currentUser;

  ngOnInit() {

    console.log("ngOnInit ...");
    this.category_courselist  = this.itemService.getCategoryCourses();
    console.log("courses no: "+this.category_courselist.length)
    if(this.category_courselist  != undefined){
          console.log("couse length" + this.category_courselist.length);
    }
  }

  goBack()
  {
    this.router.navigate(['/student-explore']);
  }
  // courseDetailPage(item){
  //   console.log('search result detail: ' + item);
  //   this.router.navigate(['/student-course-detail', item]);
  // }

}
