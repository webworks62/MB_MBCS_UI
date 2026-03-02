import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../urls/URLS'


@Injectable({
  providedIn: 'root',
})
export class subscribeServices {

  private api = `${URLS.backendapi}subscribe/create`;

  constructor(private _http: HttpClient) {}

  createInfo(post: any) {
    return this._http.post<any>(this.api, post);
  }
}
