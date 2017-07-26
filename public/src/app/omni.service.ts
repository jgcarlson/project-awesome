import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class OmniService {

    constructor(private _http: Http) { }

    //**********************************
  //product controller methods \/
  //**********************************

    todays_deals(){
      return this._http.get('/api/todays_deals')
      .map( data => data.json())
      .toPromise();
    }

    shop_by_category(){
      return this._http.get('/api/shop_by_category')
      .map( data => data.json())
      .toPromise();
    }

    featured_items(){
      return this._http.get('/api/featured_items')
      .map( data => data.json())
      .toPromise();
    }

    featured_vendors(){
      return this._http.get('/api/featured_vendors')
      .map( data => data.json())
      .toPromise();
    }

    recent_reviews(){
      return this._http.get('/api/recent_reviews')
      .map( data => data.json())
      .toPromise();
    }

    recently_viewed(){
      return this._http.get('/api/recently_viewed')
      .map( data => data.json())
      .toPromise();
    }

    suggested_products(){
      return this._http.get('/api/suggested_products')
      .map( data => data.json())
      .toPromise();
    }

    get_item(id){
      return this._http.get('/api/get_item/' + id)
      .map( data => data.json())
      .toPromise();
    }

    find_item(criteria){
      return this._http.get('/api/find_item/' + criteria)
      .map( data => data.json())
      .toPromise();
    }

    new_items_from_store(id){
      return this._http.get('/api/new_items_from_store/' + id)
      .map( data => data.json())
      .toPromise();
    }

    popular_items_from_store(id){
      return this._http.get('/api/popular_items_from_store/' + id)
      .map( data => data.json())
      .toPromise();
    }

    create_item(form){
      return this._http.post('/api/create_item', form.value) //the .value should be called somewhere before the http request
      .map( data => data.json())
      .toPromise();
    }

    //**********************************
  //user controller methods \/
  //**********************************

    register_user(user) {
      return this._http.post('/api/register_user', user)
      .map( data => data.json())
      .toPromise();
    }

    get_user(id){
      return this._http.get('/api/get_user/' + id)
      .map( data => data.json())
      .toPromise();
    }

    get_vendor(id){
      return this._http.get('/api/get_vendor/' + id)
      .map( data => data.json())
      .toPromise();
    }


}
