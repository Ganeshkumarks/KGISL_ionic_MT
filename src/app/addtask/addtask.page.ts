import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.page.html',
  styleUrls: ['./addtask.page.scss'],
})
export class AddtaskPage implements OnInit {
  addTaskForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(public formBuilder: FormBuilder, public toast: Toast) { }

  ngOnInit() {
    this.InitAddTaskForm();
    console.log(localStorage.getItem('taskList'));
  }
  InitAddTaskForm() {
    this.addTaskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.addTaskForm.valid) {
      return false;
    } else {
      var AddTask: any =
        localStorage.getItem('taskList') != null &&
          localStorage.getItem('taskList') != undefined
          ? JSON.parse(localStorage.getItem('taskList'))
          : [];

      // Time Conversion
      const timeObj = new Date(this.addTaskForm.value.time);
      let hour = timeObj.getHours();
      let minute = timeObj.getMinutes();

      // Date Conversion
      const dateObj = new Date(this.addTaskForm.value.date);
      const taskDate =
        dateObj.getFullYear() +
        '-' +
        ('0' + (dateObj.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + dateObj.getDate()).slice(-2);

      // Append To task Array
      AddTask.push({
        title: this.addTaskForm.value.title,
        description: this.addTaskForm.value.description,
        date: taskDate,
        time: hour + ':' + minute + ':00',
        time_24: this.addTaskForm.value.time
      });

      localStorage.setItem('taskList', JSON.stringify(AddTask));
      this.InitAddTaskForm();
      AddTask = [];
      this.isSubmitted = false;
      this.toast
        .show(`Task Added Successfully`, '5000', 'center')
        .subscribe((toast) => {
          // console.log(toast);
        });
    }
  }

  get errorControl() {
    return this.addTaskForm.controls;
  }
}
export class Task {
  title: string;
  description: string;
  date: Date;
  time: Time;
  time_24: Time;
}
