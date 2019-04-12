import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  img: String;
  course: any;

  constructor(
    private router: Router,
    private itemService: ItemService,
    ) { }

  ngOnInit() {
  //  setCourseImage(courseid);
   this.img = "https://s3.amazonaws.com/msoe/files/callouts/wide_sml_computer-science-landing-page.jpg";
  }

  editCourse(){
    console.log('update course button clicked')
    this.router.navigate(["/update-course"]);
  }

  // TODOS: setCourseImage function to be finished
  setCourseImage(courseid) {
    // var courseType = getCourseType(courseid);
    var courseType = "computer_science";
    switch (courseType) {
      case "computer_science": {
        this.img = "https://s3.amazonaws.com/msoe/files/callouts/wide_sml_computer-science-landing-page.jpg";
        break;
      }
      case "mathematics": {
        this.img = "https://www.rit.edu/science/sites/rit.edu.science/files/mathematics.jpg";
        break;
      }
      case "business": {
        this.img = "http://lmc123.com/images/pages/business-strategy.jpg";
        break;
      }
      case "training": {
        this.img = "http://lakevue.com/wp-content/uploads/2013/04/personal-trainer.jpg";
      }
      case "physics": {
        this.img = "http://discover.jkuat.ac.ke/wp-content/uploads/physics-banner.jpg"
      }
      case "chemistry": {
        this.img = "https://www.thoughtco.com/thmb/-kvl9EVbWRkDOdNIfJ4c14KcBho=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/formulas-157378066-56ed562c3df78ce5f836b8e6.jpg"
      }
      // TODOS: when add new course category, add new cooresponding img also!!!
    }
  }

  // get course type via course_id
  getCourseType(courseid) {
    this.course = this.itemService.getCourseById(courseid);
  }

}
