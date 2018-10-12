import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators/switchMap';


/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(private storage: Storage) {
    console.log('Hello HttpInterceptorProvider Provider');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return fromPromise(this.storage.get('token'))
      .pipe(switchMap(token => {
        req = token ? req.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }) : req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next.handle(req);
      }));
  }

}
