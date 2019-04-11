import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full'},
  { path: '', loadChildren: './student/student.module#StudentPageModule' },
  { path: '', loadChildren: './tutor/tutor.module#TutorPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'edit-student-profile', loadChildren: './edit-student-profile/edit-student-profile.module#EditStudentProfilePageModule' },
  { path: 'edit-tutor-profile', loadChildren: './edit-tutor-profile/edit-tutor-profile.module#EditTutorProfilePageModule' },
  { path: 'add-course', loadChildren: './add-course/add-course.module#AddCoursePageModule' },
  { path: 'course-detail', loadChildren: './course-detail/course-detail.module#CourseDetailPageModule' },
  { path: 'update-course', loadChildren: './update-course/update-course.module#UpdateCoursePageModule' },
  { path: 'category-detail', loadChildren: './category-detail/category-detail.module#CategoryDetailPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
