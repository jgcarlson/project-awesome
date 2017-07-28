import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OmniService } from './../omni.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = '';

  constructor(private _omniService:OmniService, private _route: ActivatedRoute) {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._route.params.subscribe((param)=>{
        console.log(param);
          console.log("searchComponent loaded and url search_criteria given is: " + param.search_critera);
          this.query = param.search_criteria;
          this._omniService.find_item(param.search_criteria)
          .then(results => {
            this.listings = results;
            console.log(results);
          })
          .catch(err => {
            console.log('Search-catch error:', err);
            //this.errors = err;
          })
          console.log("this.query: " + this.query);
      })
  }

  currentUser: any

  ngOnInit() {

  }

  listings:any = '';

  add_to_basket(product){
	if(!this.currentUser){
	  alert("Modal Window here: Please log in!")
	  //Modal window here
	}else{
	   let body = {
		   userId: this.currentUser.user.id,
		   product: product
	   }
	   this._omniService.product_to_basket(body)
     alert("Product added to basket!")
	}

  }



  /*
  ngOnInit() {
  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')))
    .subscribe((hero: Hero) => this.hero = hero);
}
  */


}
