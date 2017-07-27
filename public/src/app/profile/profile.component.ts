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
  }

  ngOnInit() {
  }

  currentUser:any;

  product = new Product()

  create_item() {
    this.product._vendor = this.currentUser.user.id;
    this._omniService.create_item(this.product)
    .then(data => console.log(data))
    .catch(data => console.log(data))
    this.product = new Product();
  }

}
