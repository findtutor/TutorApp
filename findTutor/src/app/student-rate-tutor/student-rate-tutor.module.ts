import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentRateTutorPage } from './student-rate-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: StudentRateTutorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentRateTutorPage]
})
export class StudentRateTutorPageModule {}
