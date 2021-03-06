import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdRatingConfig } from './../rating/rating.component';
import { OmniService } from './../omni.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  reviews;
  constructor(private _route: ActivatedRoute, private _omniService:OmniService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
    this._route.params.subscribe((param)=> {
      console.log(param.id)
      this.product_id = param.id;
    })
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  this._omniService.get_reviews(this.product_id)
      .then(data => this.reviews = data)
      .catch(data => console.log(data))
  }

  currentUser: any

  product_id:string;
  product:any;

  ngOnInit() {
	if(this.currentUser){
		this._omniService.get_item(this.product_id, this.currentUser.user.id)
  	  .then(data => {
  		  console.log("data: ", data)
  		  this.product = data
  	  })
  	  .catch(data => console.log(data))
  }else{
	  this._omniService.get_item_nolog(this.product_id)
		.then(data => {
			console.log("data: ", data)
			this.product = data
		})
		.catch(data => console.log(data))
  }

  }
  add_to_basket(product){
	  if(!this.currentUser){
 		alert("Please log in to add this product to your basket!")
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


}
