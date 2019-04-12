import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { ItemService } from '../item.service';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {
  public searchresultList: Array<any>;
  public coursesRef: firebase.database.Reference;
  public searchkey: any;
  coursesObervable: Observable<any[]>;
  courses: Array<any> = [];
  isStudent = false;
  constructor( private route: ActivatedRoute,
               private router: Router,
               public itemService: ItemService,
               public navCtrl: NavController) {
    console.log('category detail page constructed');

    //console.log( "usertype:" + this.itemService.usertype);
    if(this.itemService.usertype == "student"){
      this.isStudent = true;
    }
    else{
      this.isStudent = false;
    }

    this.coursesRef = firebase.database().ref('/courses');
  }

  ngOnInit() {
    this.route.params.subscribe(
        param => {
          this.searchkey = param.name;
          console.log('Selected item detail: ' + this.searchkey);
        }
    )
    this.coursesObervable = this.itemService.getCourses();
    console.log('imported all courses');
    this.coursesObervable.subscribe(courses => {
      this.courses = courses;
      if(this.courses != undefined) {
        console.log('There are ' + this.courses.length + ' courses in search page.');
        this.getItems(this.searchkey, this.courses);
      }
    })
  }
  initializeItems(){
    this.searchresultList = this.courses;
  }
  getItems(searchbar,courses) {
    console.log('search value: ' + searchbar);
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar;
    console.log('q: ' + q);

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    console.log('courses size: ' + courses.length);
    this.searchresultList = courses.filter((v) => {
      console.log('v is '+ v.category);
      if(v.category && q) {
        if (v.category.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.searchresultList.length);

  }
  goBack()
  {
    this.router.navigate(['/student-explore']);
  }
  courseDetailPage(item){
    console.log('search result detail: ' + item);
    this.router.navigate(['/course-detail', item]);
  }

}
