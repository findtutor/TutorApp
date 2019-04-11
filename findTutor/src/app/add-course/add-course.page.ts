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

  new_course_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ) { }

  ngOnInit() {
    this.new_course_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      start_time: new  FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  createCourse(value){
    this.itemService.createCourse(
      value.name, 
      value.category,
      value.description,
      value.start_time,
      value.end_time,
      value.price, 
      );
  	this.goBack();
  }

  goBack(){
  	    this.router.navigate(['/tutor-course']);
  }

}
