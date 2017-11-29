import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BetsService {

  constructor(private http:Http) { }

  getBets() {
    let headers = new Headers();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/bets/', {headers: headers})
      .map(res => res.json());
  }

}
