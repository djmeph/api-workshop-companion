import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ListProvider } from '../../providers/list/list';
import { ListItemProvider } from '../../providers/list-item/list-item';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  _id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userCtrl: UserProvider,
    private events: Events,
    public listCtrl: ListProvider,
    public listItemCtrl: ListItemProvider
  ) {
    this._id = this.navParams.get('_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  ionViewWillEnter() {
    this.listCtrl.list = null;
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
    this.listCtrl.getList(this._id);
    this.listItemCtrl.getListItems(this._id);
  }

  logout() {
    this.userCtrl.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
