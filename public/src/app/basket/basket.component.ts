import { Component, OnInit } from '@angular/core';
import { OmniService } from '.././omni.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  currentUser: any
  userBasket: Array<any> = []

  constructor(private _omniService: OmniService) { }

  ngOnInit() {
	this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
	console.log("Current User: ", this.currentUser)
	this.getBasket(this.currentUser.user.id)
  }

  getBasket(id){
	  this._omniService.get_basket(id)
	  .then( user => {
		  this.userBasket = user.basket
	  })
	  .catch( err => {
		  console.log(err)
	  })

  }

  remove_from_basket(product){
	  let body = {
		  userId: this.currentUser.user.id,
		  product: product
	  }
	  console.log("Body: ", body)
	  this._omniService.remove_from_basket(body)
	  .then( data => {
		  console.log(data)
		  this.getBasket(this.currentUser.user.id)
	  })
	  .catch( err => {
		  console.log(err)
	  })
  }

}
