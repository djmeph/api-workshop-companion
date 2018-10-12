import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userCtrl: UserProvider,
    private events: Events,
    private alertCtrl: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {

    if (this.userCtrl.authComplete) this.pageCheck();

    this.events.subscribe('authComplete',() => {
      this.pageCheck();
    });

  }

  ionViewWillLeave() {
    this.events.unsubscribe('authComplete');
  }

  pageCheck() {
    if (this.userCtrl.isLoggedIn) this.navCtrl.setRoot('home');
  }

  login() {

    if (this.loading) return;

    this.loading = true;

    this.userCtrl.auth(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.loading = false;
      this.navCtrl.setRoot(HomePage);
    }, (e) => {
      this.loading = false;
      let alert = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: e.error.message,
        buttons: ['OK']
      });
      alert.present();
    });

  }

}
