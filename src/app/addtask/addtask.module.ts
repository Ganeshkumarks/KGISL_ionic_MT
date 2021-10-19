import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddtaskPageRoutingModule } from './addtask-routing.module';

import { AddtaskPage } from './addtask.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtaskPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddtaskPage],
  providers:[Toast]
})
export class AddtaskPageModule {}
