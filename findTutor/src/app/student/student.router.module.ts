import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: 'student',
    component: StudentPage,
    children: [
      {path: 'student-course',children: [{path: '',loadChildren: '../student-course/student-course.module#StudentCoursePageModule' }]},
      {path: 'student-profile',children: [{path: '',loadChildren: '../student-profile/student-profile.module#StudentProfilePageModule'}]},
      {path: 'student-explore',children: [{path: '',loadChildren: '../student-explore/student-explore.module#StudentExplorePageModule'}]},
      {path: '',redirectTo: '/student/student-course',pathMatch: 'full'}
    ]
  },
  {path: '',redirectTo: '/student/student-course',pathMatch: 'full'},
  {path: 'student-explore',redirectTo: '/student/student-explore',pathMatch: 'full'},
  {path: 'student-profile',redirectTo: '/student/student-profile',pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentPageRoutingModule {}

