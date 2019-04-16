import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentPageRoutingModule } from './student.router.module';

import { StudentPage } from './student.page';

/*const routes: Routes = [
  {
    path: '',
    component: StudentPage
  }
];*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule
 //   RouterModule.forChild(routes)
  ],
  declarations: [StudentPage]
})
export class StudentPageModule {}
