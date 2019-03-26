import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditTutorProfilePage } from './edit-tutor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditTutorProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditTutorProfilePage]
})
export class EditTutorProfilePageModule {}
