import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {

  // new_course_form: FormGroup;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ) { }

  ngOnInit() {
    // this.new_course_form = this.formBuilder.group({
    //   name: new FormControl('', Validators.required),
    //   price: new FormControl('', Validators.required),
    //   description: new FormControl('', Validators.required),
    // });
  }

  // createItem(value){
  // 	//save the item, and then go back
  //   this.itemService.createCourse(value.name, value.price, value.description);

  // 	this.goBack();
  // }

  // goBack(){
  // 	    this.router.navigate(['/tutor-course']);
  // }

}
