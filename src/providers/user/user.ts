import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { decode } from 'jsonwebtoken';
import * as moment from 'moment';
import { GlobalProvider } from '../global/global';
import { Token } from '../../models/token';
import { User } from '../../models/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  isLoggedIn: boolean = false;
  authComplete: boolean = false;
  user: User;

  constructor(
    public http: HttpClient,
    private storage: Storage,
    private globalCtrl: GlobalProvider
  ) {
    console.log('Hello UserProvider Provider');
  }

  checkIfIsAuthenticated (token) {
    if (token && token.length > 0) {
      let decoded = decode(token) as Token;
      this.isLoggedIn = moment.unix(decoded.exp).isAfter(moment());
    } else {
      this.isLoggedIn = false;
    }
  }

  auth (email, password): Promise<any> {

    return new Promise((resolve,reject) => {

      this.http.post(this.globalCtrl.server + '/auth', {
        email: email,
        password: password
      })
      .subscribe((val: any) => {

        this.storage.set('token', val.token).then(() => {

          this.checkIfIsAuthenticated(val.token);
          resolve(val);

        });

      }, err => {
        reject(err);
      });

    });

  }

  logout() {
    this.user = null;
    this.storage.remove('token');
    this.isLoggedIn = false;
  }

}
