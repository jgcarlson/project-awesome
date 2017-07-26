import { Component, OnInit } from '@angular/core';
import { Product } from './../models/product';

import { OmniService } from './../omni.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _omniService:OmniService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  currentUser:any;

  product = new Product()

  create_item() {
    this.product._vendor = this.currentUser.user.alias;
    this._omniService.create_item(this.product)
    .then(data => console.log(data))
    .catch(data => console.log(data))
    this.product = new Product();
  }

}
