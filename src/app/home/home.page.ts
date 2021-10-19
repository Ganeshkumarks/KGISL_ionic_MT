import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  segment: string = 'home';
  todayDate: any = new Date();
  date: any;
  type: 'string';
  month: any;
  day: string;
  MonthName: any;
  todayPlan: number = 0;
  TaskList: any = [];
  next_to_done: any[];

  constructor(public navCtrl: NavController) {
    this.month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    this.MonthName = this.month[this.todayDate.getMonth()];
    this.day = ('0' + this.todayDate.getDate()).slice(-2);

    this.date =
      this.todayDate.getFullYear() +
      '-' +
      ('0' + (this.todayDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + this.todayDate.getDate()).slice(-2);
  }

  ngOnInit() {
    this.GetTaskList();
  }

  GetTaskList() {
    // Get Added task from localstorage
    const AddedTask: any =
      localStorage.getItem('taskList') != null &&
        localStorage.getItem('taskList') != undefined
        ? JSON.parse(localStorage.getItem('taskList'))
        : [];
    var TodayTask = [];

    // Filter task based on selected date
    AddedTask.filter((element) => {
      if (element.date == this.date) {
        if (new Date().getTime() <= new Date(element.time_24).getTime()) {
          TodayTask.push(element);
        }
      }
    });

    // Count of today plan
    this.todayPlan = TodayTask.length;

    // Sort task by time in ascending order
    this.TaskList = TodayTask.sort((a, b) => {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      return 0;
    });

    // Filter upcoming task
    this.next_to_done = [];
    // this.TaskList.forEach((element, index) => {

    //   // Remove past time from array
    //   if (new Date().getTime() >= new Date(element.time_24).getTime()) {
    //     console.log('im here');
    //     this.TaskList.splice(index,1);
    //   }

    //   // Append data to next to done array and remove from task list
    //   if (new Date().getTime() < new Date(element.time_24).getTime()) {
    //     this.next_to_done.push(element);
    //     this.TaskList.splice(index,1);
    //     return;
    //   }
    // });
    this.next_to_done = this.TaskList.splice(0, 1);
    console.log(this.next_to_done);
    console.log(this.TaskList);
  }

  segmentChanged(event: any) {
    if (event.detail.value == 'tab') {
      this.navCtrl.navigateBack('/tab/tabs/tab1');
    }
  }

  onChange(event) {
    const selDate = new Date(event);
    this.MonthName = this.month[selDate.getMonth()];
    this.day = ('0' + selDate.getDate()).slice(-2);
    this.date =
      selDate.getFullYear() +
      '-' +
      ('0' + (selDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + selDate.getDate()).slice(-2);
    this.GetTaskList();
  }

  AddTask() {
    this.navCtrl.navigateBack('/addtask');
  }
}
