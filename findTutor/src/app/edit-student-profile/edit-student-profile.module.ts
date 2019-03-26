import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditStudentProfilePage } from './edit-student-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditStudentProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditStudentProfilePage]
})
export class EditStudentProfilePageModule {}
