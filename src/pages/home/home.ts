import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ListProvider } from '../../providers/list/list';
import { LoginPage } from '../../pages/login/login';
import { ListPage } from '../../pages/list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private userCtrl: UserProvider,
    private events: Events,
    public listCtrl: ListProvider
  ) {}

  ionViewWillEnter() {
    this.listCtrl.lists = [];
    if (this.userCtrl.authComplete) this.pageCheck();
    this.events.subscribe('authComplete',() => this.pageCheck());
  }

  ionViewWillLeave() {
    this.events.unsubscribe('authComplete');
  }

  pageCheck() {
    if (this.userCtrl.isLoggedIn) this.getOverview();
    else this.navCtrl.setRoot(LoginPage);
  }

  getOverview() {
    this.listCtrl.getLists();
  }

  getList(_id: string) {
    this.navCtrl.push(ListPage, { _id: _id });
  }

  logout() {
    this.userCtrl.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
