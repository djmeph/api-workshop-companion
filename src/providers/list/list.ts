import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';
import { List } from '../../models/list';

/*
  Generated class for the ListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListProvider {

  lists: List[];
  list: List;

  constructor(
    public http: HttpClient,
    private globalCtrl: GlobalProvider
  ) {
    console.log('Hello ListProvider Provider');
  }

  getLists() {
    this.http.get(this.globalCtrl.server + '/lists')
    .subscribe((val: List[]) => this.lists = val, err => console.error(err));
  }

  getList(_id) {
    this.http.get(this.globalCtrl.server + '/list/' + _id)
    .subscribe((val: List) => this.list = val, err => console.error(err));
  }

}
