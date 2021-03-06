import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private itemService: ItemService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.course = param;
        console.log(this.course);
      }
    )
   console.log("course category is " + this.course.category);
   this.setCourseImage(this.course.category);
  }

  editCourse(){
    console.log('update course button clicked')
    this.router.navigate(["/update-course"]);
  }

  // TODOS: setCourseImage function to be finished

  setCourseImage(courseType) {
    switch (courseType) {
      case "computer science": {
        this.img = "https://s3.amazonaws.com/msoe/files/callouts/wide_sml_computer-science-landing-page.jpg";
        break;
      }
      case "mathematics": {
        this.img = "https://www.monash.edu/__data/assets/image/0005/848561/17P-0341-Making-sense-of-the-world-Feature-box.jpg";
        break;
      }
      case "business": {
        this.img = "http://lmc123.com/images/pages/business-strategy.jpg";
        break;
      }
      case "training": {
        this.img = "http://lakevue.com/wp-content/uploads/2013/04/personal-trainer.jpg";
        break;
      }
      case "physics": {
        this.img = "http://snagfilms-a.akamaihd.net/b6/f5/105549274aa399567d3082c9b3db/1280-physics-2x.jpg";
        break;
      }
      case "chemistry": {
        this.img = "https://www.thoughtco.com/thmb/-kvl9EVbWRkDOdNIfJ4c14KcBho=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/formulas-157378066-56ed562c3df78ce5f836b8e6.jpg";
        break;
      }
      case "language": {
        this.img = "https://cdn-images-1.medium.com/max/1600/1*nNxybrXr-YPikYvaXyDbkQ.jpeg";
        break;
      }
      case "physical science and engineering": {
        this.img = "https://img.haikudeck.com/mg/BA390EFF-28CD-4B2B-9F99-783FAC9BE158.jpg";
        break;
      }
      // TODOS: when add new course category, add new cooresponding img also!!!
    }
  }

  deleteCourse(id){
    this.itemService.deleteCourse(id);
    console.log("Couse has been deleted!");
  }

  goBack(){
    this.router.navigate(['/tutor-course']);
  }
  

}
