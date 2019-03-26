import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorPage } from './tutor.page';

const routes: Routes = [
  {
    path: 'tutor',
    component: TutorPage,
    children: [
      {path: 'tutor-course',children: [{path: '',loadChildren: '../tutor-course/tutor-course.module#TutorCoursePageModule' }]},
      {path: 'tutor-profile',children: [{path: '',loadChildren: '../tutor-profile/tutor-profile.module#TutorProfilePageModule'}]},
      {path: 'tutor-orders',children: [{path: '',loadChildren: '../tutor-orders/tutor-orders.module#TutorOrdersPageModule'}]},
      {path: '',redirectTo: '/tutor/tutor-orders',pathMatch: 'full'}
    ]
  },
  {path: '',redirectTo: '/tutor/tutor-orders',pathMatch: 'full'},
  {path: 'tutor-course',redirectTo: '/tutor/tutor-course',pathMatch: 'full'},
  {path: 'tutor-profile',redirectTo: '/tutor/tutor-profile',pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TutorPageRoutingModule {}

