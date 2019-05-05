import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tutor-orders',
  templateUrl: './tutor-orders.page.html',
  styleUrls: ['./tutor-orders.page.scss'],
})
export class TutorOrdersPage implements OnInit {
 
  //tutor_orders=[];
  current_user = firebase.auth().currentUser;

  ordersdb = firebase.database().ref('orders/');
  tutor_orders: Array<any> =[];
  
  constructor(
    private router: Router,
    public itemService : ItemService,
    public events: Events
  ) { 
    // var self = this;
    // events.subscribe('dataloaded', (time) => {
    //   // user and time are the same arguments passed in `events.publish(user, time)`
    //   console.log('data load time:', time);
    //   self.tutor_orders = self.itemService.getTutorOrders();
    //   console.log("coursesssss loaded: " + self.tutor_orders);
    //   });
    //   // load orders from DB when construct the page
    //   self.tutor_orders  = self.itemService.getTutorOrders();

      this.ordersdb.on('value', resp => {
        this.tutor_orders = [];
        this.tutor_orders = snapshotToArray_TutorOrders(resp);
        console.log(this.tutor_orders.length+" courses loaded");
        console.log(this.tutor_orders);
  
        this.events.publish('dataloaded',Date.now());
      });
  }

  ngOnInit() {
    // console.log("ngOnInit ...");
    // this.tutor_orders  = this.itemService.getTutorOrders();
    // console.log("courses no: "+this.tutor_orders.length)
    // if(this.tutor_orders  != undefined){
    //       console.log("couse length" + this.tutor_orders.length);
    // }
    // var self = this;
    // this.events.subscribe('dataloaded', (time) => {
    //   // user and time are the same arguments passed in `events.publish(user, time)`
    //   console.log('data load time:', time);
    //   self.tutor_orders = this.itemService.getTutorOrders();
    //   console.log("courses loaded: " + self.tutor_orders);
    // });
    // // load orders from DB when construct the page
    // self.tutor_orders  = this.itemService.getTutorOrders();
  }

  updateOrderAccept(course){
    course.status = "accept";
    let newInfo = firebase.database().ref('orders/' + course.order_id).update(course);
  }
  hideOrNot(value){
    if(value==="pending"|| value==="deny" || value==="t_rated"|| value==="rated")
      return true;
    else return false;
  }
  updateOrderDeny(course){
    course.status = "deny";
    let newInfo = firebase.database().ref('orders/' + course.order_id).update(course);
  }
  tutorRateStudent(course)
  {
    this.router.navigate(["/tutor-rate-student", course]);
  }
  courseDetailPage(course){
    this.router.navigate(["/tutor-course-order-detail", course]);
  }

}

export const snapshotToArray_TutorOrders = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
     // console.log("course own id" + item.ownerid);
     // console.log("current user: " + firebase.auth().currentUser.uid);
      if (item.tutor_id == firebase.auth().currentUser.uid){
          returnArr.push(item);
      }
  });

  return returnArr;
}
