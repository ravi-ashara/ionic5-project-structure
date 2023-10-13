import { apiMethod } from 'src/app/constants/constants';
import { CallApiService } from './../../services/callApi/call-api.service';
import { Component, OnInit } from '@angular/core';
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public callAPI: CallApiService) { }

  ngOnInit() {
    this.setCredentials();
  }


  async getCredential() {
    const credentials = await NativeBiometric.getCredentials({
      server: "the-example-demo",
    });
    console.log('credentials', credentials);
  }

  async performBiometricVerification() {
    const result = await NativeBiometric.isAvailable();
    const touchIdKey = localStorage.getItem('touchIdKey');

    if (!result.isAvailable && !touchIdKey) return;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      description: "Maybe a description too?",
    })
      .then(() => true)
      .catch(() => false);

    if (!verified) return;

    this.getCredential();
  }

  async setCredentials() {
    const result = await NativeBiometric.isAvailable();
    if (!result.isAvailable) return
    // Save user's credentials
    await NativeBiometric.setCredentials({
      username: "ravi",
      password: "Passw0rd",
      server: "the-example-demo",
    });
    localStorage.setItem('touchIdKey', 'ravi');
  }
}
