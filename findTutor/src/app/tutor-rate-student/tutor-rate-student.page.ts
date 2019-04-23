import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tutor-rate-student',
  templateUrl: './tutor-rate-student.page.html',
  styleUrls: ['./tutor-rate-student.page.scss'],
})
export class TutorRateStudentPage implements OnInit {
  order_info: any;
  quantity: number;
  is_rated: any;
  
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
        this.is_rated = this.order_info.rate_status;
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
    // this.itemService.createRating(order_info, quantity);
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/tutor/tutor-orders']);
  }


}
