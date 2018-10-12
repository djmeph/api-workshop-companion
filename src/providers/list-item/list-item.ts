import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';
import { ListItem } from '../../models/list-item';

/*
  Generated class for the ListItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListItemProvider {

  listItems: ListItem[];

  constructor(
    public http: HttpClient,
    private globalCtrl: GlobalProvider
  ) {
    console.log('Hello ListItemProvider Provider');
  }

  getListItems(_id) {
    this.http.get(this.globalCtrl.server + '/list-items/' + _id)
    .subscribe((val: ListItem[]) => this.listItems = val, err => console.error(err));
  }

}
