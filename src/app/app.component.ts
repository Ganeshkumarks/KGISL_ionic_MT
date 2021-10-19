import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public _location: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#8B5EC4");
    });
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/home')) {
        this.showExitConfirm();
        processNextHandler();
      } else {
        console.log('Navigate to back page');
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }

  showExitConfirm() {
    navigator['app'].exitApp();
    // this.alertController.create({
    //   header: 'App termination',
    //   message: 'Do you want to close the app?',
    //   backdropDismiss: false,
    //   buttons: [{
    //     text: 'Stay',
    //     role: 'cancel',
    //     handler: () => {
    //       console.log('Application exit prevented!');
    //     }
    //   }, {
    //     text: 'Exit',
    //     handler: () => {
    //       navigator['app'].exitApp();
    //     }
    //   }]
    // })
    //   .then(alert => {
    //     alert.present();
    //   });
  }
}
