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

  constructor(private _route: ActivatedRoute, private _omniService:OmniService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
    this._route.params.subscribe((param)=> {
      console.log(param.id)
      this.product_id = param.id;
    })
  }

  product_id:string;
  product:any;

  ngOnInit() {
    this._omniService.get_item(this.product_id)
    .then(data => this.product = data)
    .catch(data => console.log(data))
  }

}
