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

}
