import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.page.html',
  styleUrls: ['./update-course.page.scss'],
})
export class UpdateCoursePage implements OnInit {
  update_course_form: FormGroup;
  private cur_course: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ) { 
    this.update_course_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      start_time: new  FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required)
    });
    console.log("constructor of UpdateCoursePage")
  }

  ngOnInit() {
   this.getCourseById("fs7o1j3BJPW3LDUtZ5MA");
    if(this.cur_course) {
      this.update_course_form.patchValue({name:this.cur_course.name});
      this.update_course_form.patchValue({category:this.cur_course.category});
    }
   
  }

  getCourseById(id) {
     this.cur_course = this.itemService.getCourseById(id);
     console.log("current course = " + this.cur_course);
  }

  updateCourse(value) {

  }

}
