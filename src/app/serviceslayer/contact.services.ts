import { Injectable } from "@angular/core";
import {URLS} from '../urls/URLS'
import { HttpClient } from "@angular/common/http";


@Injectable({
   providedIn: 'root'
})
export class contactServices{

    private api = `${URLS.backendapi}contact/create-info`;

    constructor(private _http:HttpClient){}

    createInfo(post:any){
      return this._http.post<any>(this.api, post);
    }

}
