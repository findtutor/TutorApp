import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutorCourseOrderDetailPage } from './tutor-course-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TutorCourseOrderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutorCourseOrderDetailPage]
})
export class TutorCourseOrderDetailPageModule {}
