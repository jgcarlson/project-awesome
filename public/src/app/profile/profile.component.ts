import { Component, OnInit } from '@angular/core';
import { Product } from './../models/product';
import { FileUploadModule } from 'primeng/primeng';

import { OmniService } from './../omni.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  recently_viewed;
  suggested_products;
  orders;
  currentUser:any;
  product = new Product()
  basket;

  constructor(private _omniService:OmniService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._omniService.recently_viewed(this.currentUser.user.id)
          .then(results => {
            this.recently_viewed = results;
            console.log("RECENTLY_VIEWED: " + results);
          })
          .catch(err => {
            console.log('Recently_viewed-catch error:', err);
            //this.errors = err;
          })
    this._omniService.suggested_products(this.currentUser.user.id)
          .then(results => {
            this.suggested_products = results;
            console.log("SUGGESTED_PRODUCTS: " + results);
          })
          .catch(err => {
            console.log('suggested_products-catch error:', err);
            //this.errors = err;
          })
    this._omniService.order_history(this.currentUser.user.id)
          .then(results => {
            this.orders = results;
            console.log("ORDER_HISTORY: " + results);
          })
          .catch(err => {
            console.log('order_history-catch error:', err);
            //this.errors = err;
          })
    this._omniService.get_basket(this.currentUser.user.id)
          .then(user => {
            this.basket = user.basket;
            console.log("BASKET: " + this.basket);
          })
          .catch(err => {
            console.log('basket-catch error:', err);
            //this.errors = err;
          })
  }

  ngOnInit() {
  }



  create_item() {
    this.product._vendor = this.currentUser.user.id;
    this._omniService.create_item(this.product)
    .then(data => console.log(data))
    .catch(data => console.log(data))
    this.product = new Product();
  }


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
        .then(basket => {
          console.log("BASKET RETURNED: " + basket);
          this.basket = basket;
        })
        .catch(data => console.log(data))
       alert("Product added to basket!");
    }
  }

  remove_from_basket(product){
    let body = {
      userId: this.currentUser.user.id,
      product: product
    }
    //console.log("Body: ", body)
    this._omniService.remove_from_basket(body)
      .then( data => {
        this._omniService.get_basket(this.currentUser.user.id)
          .then(user => {
            this.basket = user.basket;
            console.log("BASKET: " + this.basket);
      })
      .catch(err => {
          console.log('basket-catch error:', err);
            //this.errors = err;
      })
    })
    .catch( err => {
      console.log(err)
    })

  }

}
