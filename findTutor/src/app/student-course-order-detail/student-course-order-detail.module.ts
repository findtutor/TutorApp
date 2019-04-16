import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentCourseOrderDetailPage } from './student-course-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCourseOrderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentCourseOrderDetailPage]
})
export class StudentCourseOrderDetailPageModule {}
