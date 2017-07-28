import { Component, OnInit } from '@angular/core';

import { OmniService } from './../omni.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private _omniService:OmniService) {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.todays_deals()
  }

  currentUser: any
  todays_listing:any = ''

  todays_deals() {
    console.log('firing')
    this._omniService.todays_deals()
    .then(data => {
      console.log(data)
      this.todays_listing = data
    })
    .catch(data => console.log(data))
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
