import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../providers/user/user';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private userCtrl: UserProvider,
    private events: Events
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('token').then(val => {
        this.userCtrl.checkIfIsAuthenticated(val);
        if (this.userCtrl.isLoggedIn) {
          this.userCtrl.authComplete = true;
          this.events.publish('authComplete');
        } else {
          this.logout();
          this.userCtrl.authComplete = true;
          this.events.publish('authComplete');
        }
      });
    });
  }

  logout () {
    this.nav.setRoot(LoginPage);
    this.userCtrl.logout();
  }
}

