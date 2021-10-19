import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  segment: string = 'tab';
  YearList: any = [];
  MonthList: any = [];
  DateList: any = [];
  TaskList: any;
  month: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
    this.GetTaskList();
  }

  GetTaskList() {
    // Get Added task from localstorage
    this.TaskList =
      localStorage.getItem('taskList') != null &&
        localStorage.getItem('taskList') != undefined
        ? JSON.parse(localStorage.getItem('taskList'))
        : [];

    this.YearList = [];

    // Filter task based on selected date
    this.TaskList.filter((element) => {
      if (this.YearList.length > 0) {
        this.YearList.forEach(year => {
          if (year.year != new Date(element.date).getFullYear()) {
            this.YearList.push({
              year: new Date(element.date).getFullYear(),
              yearStatus: false
            });
          }
        });
      } else {
        this.YearList.push({
          year: new Date(element.date).getFullYear(),
          yearStatus: false
        });
      }
    });
  }
  // Tab Change event
  segmentChanged(event: any) {
    if (event.detail.value == 'home') {
      this.navCtrl.navigateRoot('');
    }
  }

  // Year Filter for accordion
  showMonth(y, i, s) {
    this.YearList.find((item, index) => {
      if (i == index) {
        item.yearStatus = !s;
      }
    });
    this.MonthList = [];
    this.TaskList.filter((element) => {
      const monthIndex: any = new Date(element.date).getMonth();
      if (new Date(element.date).getFullYear() == y) {
        if (this.MonthList.length > 0) {
          this.MonthList.forEach((mon, index) => {
            if (monthIndex != mon.month) {
              this.MonthList.push({
                month: monthIndex,
                monthName: this.month[monthIndex],
                monthStatus: false
              });
            }
          });
        } else {
          this.MonthList.push({
            month: monthIndex,
            monthName: this.month[monthIndex],
            monthStatus: false
          });
        }
      }
    });
  }

  // Month Filter for accordion
  showDate(y, m, i, s) {
    this.MonthList.find((item, index) => {
      if (i == index) {
        item.monthStatus = !s;
      }
    });
    this.DateList = [];
    this.TaskList.filter((element) => {
      const monthIndex: any = new Date(element.date).getMonth();
      if (new Date(element.date).getFullYear() == y) {
        if (m == monthIndex) {
          this.DateList.push(element);
        }
      }
    });
  }
}
