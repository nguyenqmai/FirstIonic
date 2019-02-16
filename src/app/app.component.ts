import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { FcmService } from './services/fcm.service';
import { FcmNotification } from './model/fcmnotification.model';

import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private currentFCMToken : string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }


  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: "top",
      showCloseButton: true,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.onNotificationOpen().subscribe((msg: FcmNotification) => {
      console.log("got msg inside app.components.ts " + JSON.stringify(msg))
      this.fcm.saveNotification(msg);
      this.presentToast(JSON.stringify(msg))
    });
  }


}
