import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { OmniService } from '.././omni.service';

@Component(
{
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],

})
export class BasketComponent implements OnInit {

  currentUser: any
  userBasket: Array<any> = []

  constructor(private _omniService: OmniService) { }



  ngOnInit() {
    // console.log("MADE IT TO INIT OF BASKET COMPONENT");
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    // console.log("Current User: ", this.currentUser)
    this.getBasket(this.currentUser.user.id)
  }

  getBasket(id){
    this._omniService.get_basket(id)
    .then( user => {
    // console.log("RECEIVED USER IN BASKET COMPONENT: " + user);
      this.userBasket = user.basket;
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
	//   window.location.reload()
      this.getBasket(this.currentUser.user.id)
    })
    .catch( err => {
      console.log(err)
    })
  }

  process_order(confirmation){
	  this._omniService.process_order(this.currentUser)
	  .then( response => {
		  console.log("Successful order: ", response)
		  alert("Thank you for your order!")
		  this.getBasket(this.currentUser.user.id)
	  })

  }

}
