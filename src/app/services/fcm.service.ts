import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private currentToken: string = null;

  constructor(private firebase: Firebase,
    private platform: Platform) {
      this.setup();
    }

    private setup() {
      console.log("calling fcmService setup ")
      this.firebase.onTokenRefresh().subscribe(newToken => {
        if (this.platform.is('ios')) {
          // need to open a modal and ask for granting permission
          // this.firebase.grantPermission();
          console.log("Is iOS platform ")
        }
        console.log("got token " + newToken)
      })
    }

    public getCurrentToken() {
      return this.currentToken;
    }

    public subscribeToTopic(topic: string) {
      // if (this.currentToken == null) {
      //   console.log("subscribeToTopic: this.currentToken is null")
      //   return; // should show a modal of issue
      // }

      this.firebase.subscribe(topic).then(good => {
        console.log("subscribeToTopic: good " + good)
      }, 
      bad => {
        console.log("subscribeToTopic: bad " + bad)
      })
    }

    
    public unsubscribeFromTopic(topic: string) {
      this.firebase.unsubscribe(topic).then(good => {
        console.log("unsubscribeFromTopic: good " + good)
      }, 
      bad => {
        console.log("unsubscribeFromTopic: bad " + bad)
      })
    }

    // public clearAllNotifications() {
    //   if (this.currentToken == null) {
    //     return; // should show a modal of issue
    //   }
    //   this.firebase.().then(good => {}, bad => {})
    // }


    public onNotificationOpen() {
      return this.firebase.onNotificationOpen();
    }

}