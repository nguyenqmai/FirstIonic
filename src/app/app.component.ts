import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './services/fcm.service';

import { ToastController } from '@ionic/angular';
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
    this.fcm.onNotificationOpen().subscribe(
      (msg) => {
        console.log("got msg inside app.component.ts " + JSON.stringify(msg))
        if (this.platform.is('ios')) {
          console.log("ios got msg inside app.component.ts " + msg.body)
          this.presentToast(msg.body);
        } else {
          console.log("ELSE got msg inside app.component.ts " + msg.body)
          this.presentToast(msg.body);
        }
      });

      this.fcm.subscribeToTopic("nqmai-topic-01");
  }


}
