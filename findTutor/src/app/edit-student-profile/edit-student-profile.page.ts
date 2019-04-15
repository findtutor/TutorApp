import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.page.html',
  styleUrls: ['./edit-student-profile.page.scss'],
})
export class EditStudentProfilePage implements OnInit {

  student_profile_form: FormGroup;
  cur_profile: any;

  constructor(
    public router:Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { 
    this.student_profile_form = this.formBuilder.group({
      image: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      contact_info: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        console.log("param = " + param);
        this.cur_profile = param;
        console.log("current profile is " + this.cur_profile);
        console.log("current profile id is = " + this.cur_profile.id);
        this.student_profile_form.patchValue({image:this.cur_profile.image});
        this.student_profile_form.patchValue({username:this.cur_profile.username});
        this.student_profile_form.patchValue({contact_info: this.cur_profile.contact_info});
      }
    )
  }

  updateProfile(value) {
    console.log("valueeeee username is " + value.username);
    console.log("currrrent profile id issss: " + this.cur_profile.id);
    let newProfile = {
      id: this.cur_profile.id,
      image: value.image,
      username: value.username,
      contact_info: value.contact_info,
      field: "N/A",
      introduction: "N/A"
    }
    this.itemService.updateProfile(newProfile);
  }

  goBack(){
    this.router.navigate(['/student-profile']);
  }


}
