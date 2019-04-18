import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutorRateStudentPage } from './tutor-rate-student.page';

const routes: Routes = [
  {
    path: '',
    component: TutorRateStudentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutorRateStudentPage]
})
export class TutorRateStudentPageModule {}
