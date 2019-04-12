import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';


import { ItemService } from '../item.service';
import { NavController } from '@ionic/angular';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-explore',
  templateUrl: './student-explore.page.html',
  styleUrls: ['./student-explore.page.scss'],
})
export class StudentExplorePage implements OnInit {
  public categoryList:Array<any>;
  public loadedcategoryList:Array<any>;
  public categoryRef: firebase.database.Reference;
  categoryObervable: Observable<any[]>;
  categories: Array<any> = [];
  isStudent = false;
  rowList: Array<any> = [];
  searchKey = "";
  constructor(
      private router: Router,
      public itemService: ItemService,
      public navCtrl: NavController)
  {
    console.log('explore page constructed');
    console.log( "usertype:" + this.itemService.usertype);
    if(this.itemService.usertype == "student"){
      this.isStudent = true;
    }
    else{
      this.isStudent = false;
    }
    this.categoryRef = firebase.database().ref('/categories');

    this.categoryRef.on('value', categoryList => {
      let Catgories = [];
      categoryList.forEach( category => {
        Catgories.push(category.val());
        return false;
      });

      this.categoryList = Catgories;
      this.loadedcategoryList = Catgories;
    });
  }
  initializeItems(){
    this.categoryList = this.loadedcategoryList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar;
    console.log('q: ' + q);

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    console.log('categoryList size: ' + this.categories.length);
    this.categoryList = this.categories.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    //this.searchResultPage(this.categoryList);

    console.log(q, this.categoryList.length);

  }
  ngOnInit() {
    this.categoryObervable = this.itemService.getCategories();
    console.log('imported categories');
    this.categoryObervable.subscribe(categories => {
      this.categories = categories;
      if(this.categories != undefined) {
        console.log('There are ' + this.categories.length + ' categories in explore page.');
        console.log('There are ' + this.categories.length + ' to be iterated');
        this.rowList=[];
        this.rowList=this.getRowListByGridList(3);
      }
    })

  }
  // get the row list for generating the grid view.
  getRowListByGridList(size){
    console.log('There are ' + this.categories.length + ' to be iterated');
    var rowList = [];
    for (var i = 0; i < this.categories.length; i += size) {
      rowList.push(this.categories.slice(i, i + size));
    }
    return rowList;
  }
  categoryDetailPage(item)
  {
    console.log('category detail: ' + item);
    this.router.navigate(['/category-detail', item]);
  }
  searchResultPage(key)
  {
    console.log('search result detail: ' + item);
    //this.navCtrl.navigateForward("/search-result", item);

    let item = {key : key};
    this.router.navigate(["/search-result", item]);

  }
  openPages(Page, Data){
    this.navCtrl.navigateForward(Page, Data);
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}
