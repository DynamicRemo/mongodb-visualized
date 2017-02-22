import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

@Injectable()
export class MongoDBService {
  constructor(public _http: Http) {

  }

  getAllCollections(): Observable<Object[]> {
    return this._http.get('api/mongodb/all_collections')
            .map(this.extractMongoData)
            .catch(this.handleError);
  }

  getAllCollectionsCount(): Observable<Object[]> {
    return this._http.get('api/mongodb/all_collections_count')
            .map(this.extractMongoData)
            .catch(this.handleError);
  }

  private extractMongoData(res: Response) {
    let body = res.json();
    return body || {};
  }


  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}