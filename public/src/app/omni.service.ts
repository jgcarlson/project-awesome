import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';


@Injectable()
export class OmniService implements CanActivate {

    constructor(private _http: Http, private _router:Router) { }

  //**********************************
  // canActivate: Allows only logged in users to view certain pages (in conjunction with the app-routing module). \/
  //**********************************

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
          return true;
      }
      this._router.navigate(['/']);
      return false;
  }

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

    recently_viewed(id){
      return this._http.get('/api/recently_viewed/'+ id)
      .map( data => data.json())
      .toPromise();
    }

    order_history(id){
      return this._http.get('/api/order_history/'+ id)
      .map( data => data.json())
      .toPromise();
    }

    suggested_products(id){
      return this._http.get('/api/suggested_products/'+ id)
      .map( data => data.json())
      .toPromise();
    }

    get_item(product_id, user_id){
      return this._http.get('/api/get_item/' + product_id + '/' + user_id)
      .map( data => data.json())
      .toPromise();
    }

    get_item_nolog(product_id){
      return this._http.get('/api/get_item_nolog/' + product_id)
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

    my_items(id){
      return this._http.get('/api/my_items/' + id)
      .map( data => data.json())
      .toPromise();
    }

    create_item(item){
      return this._http.post('/api/create_item', item)
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

    login(data) {
      return this._http.post('/api/authenticate', data)
      .map((res) => {
        let user = res.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }).
      toPromise();
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

	process_order(user){
		return this._http.post('/api/process_order/', user)
		.map( data => data.json())
		.toPromise()
	}

    //**********************************
    //review controller methods \/
    //**********************************

    review_product(review){
      return this._http.post('/api/review_product', review)
      .map( data => data.json())
      .toPromise();
    }

    review_vendor(review){
      return this._http.post('/api/review_vendor', review)
      .map( data => data.json())
      .toPromise();
    }

    get_reviews(id){
      return this._http.get('/api/get_reviews/' + id)
      .map( data => data.json())
      .toPromise();
    }

	get_basket(id){
	  return this._http.get('/api/get_basket/' + id)
	  .map( data => data.json())
	  .toPromise();
	}

	product_to_basket(body){
		return this._http.post('/api/basket', body)
		.map( data => data.json())
		.toPromise()
	}

	remove_from_basket(body){
		return this._http.post('/api/remove_from_basket', body)
		.map( data => data.json())
		.toPromise()
	}


}
