import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {

  constructor( private router: Router,
               public itemService: ItemService) { }

  ngOnInit() {
  }
  goBack()
  {
      this.router.navigate(['/student-explore']);
  }

}
