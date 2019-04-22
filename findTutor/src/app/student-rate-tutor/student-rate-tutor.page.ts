import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-student-rate-tutor',
  templateUrl: './student-rate-tutor.page.html',
  styleUrls: ['./student-rate-tutor.page.scss'],
})



export class StudentRateTutorPage implements OnInit {
  order_info: any;
  quantity: number;

  private img = "https://media.brstatic.com/2017/06/23134715/tom-cruise-networth.jpg";

  constructor(
      public router:Router,
      private route: ActivatedRoute,
      private itemService: ItemService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(
        param => {
          this.order_info = param;
          console.log("order id = " + this.order_info.id);
        }
    )
  }

  createRating(order_info, quantity){
    console.log('rate_statusWWW'+order_info.rate_status);
    if(order_info.rate_status === 'false') {
      this.itemService.createRating(order_info, quantity);
    }
    else{
      console.log('rate_status***'+order_info.rate_status);
    }
    this.goBack();
  }
  goBackToDetail(){
    this.router.navigate(['/student/student-course']);
  }

  goBack(){
    this.router.navigate(['/student/student-course']);
  }


}
