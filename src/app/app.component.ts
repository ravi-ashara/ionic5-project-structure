import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    if (localStorage.theme) {
      if (localStorage.theme == 'dark')
        document.body.classList.add('dark');
      document.body.setAttribute('data-theme', localStorage.theme);
    } else {
      document.body.setAttribute('data-theme', 'light');
    }

    this.nativePushNotificationEnable();
  }

  async pushNotificationInitialize() {
    PushNotifications.register();
  }

  async checkPermission() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting for version below 12, for 13+,checkPermissions added.
    if (this.platform.is('ios')) {
      this.requestPermission();
      return;
    }
    PushNotifications.checkPermissions().then((permission) => {
      if (permission.receive === 'prompt' || permission.receive === 'prompt-with-rationale') {
        this.requestPermission();
      } else if (permission.receive === 'granted') {
        this.pushNotificationInitialize();
      }
    });
  }
  requestPermission() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        this.pushNotificationInitialize();
      } else {
        // Show some error
      }
    });
  }

  async nativePushNotificationEnable() {
    // TODO: CHP-3664
    PushNotifications.removeAllListeners();
    this.checkPermission();

    await PushNotifications.addListener('registration', token => {
      localStorage.setItem('pushToken', token.value);
      console.info('Registration token: ', token);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
}
