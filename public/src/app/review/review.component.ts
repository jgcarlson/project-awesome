import { Component, OnInit } from '@angular/core';
import { Review } from './../models/review';
import { ActivatedRoute } from '@angular/router';
import { OmniService } from './../omni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
	thisreview = new Review();
  currentUser:any;

  constructor(private _omniService:OmniService, 
  	private _route: ActivatedRoute, private _router:Router) {
  	this._route.params.subscribe((param)=>{
  		this.thisreview._reviewedProduct = param.id;
  	})
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	this.thisreview._byUser = this.currentUser.user.id;
    console.log("REVIEW AFTER ADDING BYUSER: " + this.thisreview);
   }

  ngOnInit() {
  }

  review_product(){
  console.log("REVIEW BEFORE SENDING: " + this.thisreview);
  	this._omniService.review_product(this.thisreview)
          .then(something => {
            this._router.navigate(['/user', this.currentUser.user.alias]);
          })
          .catch(err => {
            console.log('Review-catch error:', err);
            //this.errors = err;
          })
  }

}
