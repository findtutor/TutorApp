import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';

import { StudentExplorePage } from './student-explore.page';

const routes: Routes = [
  {
    path: '',
    component: StudentExplorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentExplorePage]
})
export class StudentExplorePageModule {}
