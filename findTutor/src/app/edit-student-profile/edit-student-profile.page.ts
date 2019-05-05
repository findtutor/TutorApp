import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';

import { ItemService } from '../item.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.page.html',
  styleUrls: ['./edit-student-profile.page.scss'],
})
export class EditStudentProfilePage implements OnInit {

  student_profile_form: FormGroup;
  cur_profile: any;
  imgfile="";
  imgUrl="";

  constructor(
    public router:Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private camera: Camera, private file: File,
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
        console.log("current profile id is = " + this.cur_profile.uid);
        this.student_profile_form.patchValue({image:this.cur_profile.image});
        this.student_profile_form.patchValue({username:this.cur_profile.username});
        this.student_profile_form.patchValue({contact_info: this.cur_profile.contact_info});
      }
    )
  }

  async pickImage() {
    const options: CameraOptions = {
      quality: 40,
      targetHeight:1024,
      targetWidth:1024,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      console.log(this);
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.uploadToFirebase(blobInfo);
      console.log(uploadInfo);
      // let url:any = uploadInfo.ref.getDownloadURL();
      alert("File Upload Success " + uploadInfo);
      this.imgfile = uploadInfo;
      
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
 }

  /**
   *
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let imageid = (Math.floor(Math.random() * 2000)).toString();
      let filename = "menu_"+imageid
      // filename = _imageBlobInfo.fileName;
      let fileRef = firebase.storage().ref("images/" + filename);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      let mydownloadurl="";
      

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
          console.log(
            "snapshot progess " +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...  get the image URL for saving to database
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            mydownloadurl = downloadURL;
            resolve( mydownloadurl);
            this.imgUrl=mydownloadurl;
          });

          // resolve( uploadTask.snapshot);
          // resolve( mydownloadurl);

        }
      );
    });
  }



  updateProfile(value) {
    console.log("valueeeee username is " + value.username);
    console.log("currrrent profile id issss: " + this.cur_profile.uid);
    let newProfile = {
      uid: this.cur_profile.uid,
     // image: value.image,
      image: this.imgfile,
      username: value.username,
      contact_info: value.contact_info,
      field: "N/A",
      introduction: "N/A"
    }
    this.itemService.updateProfile(newProfile);
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/student-profile']);
  }


}
