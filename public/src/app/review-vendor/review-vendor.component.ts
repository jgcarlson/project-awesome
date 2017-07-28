import { Component, OnInit } from '@angular/core';
import { Review } from './../models/review';
import { ActivatedRoute } from '@angular/router';
import { OmniService } from './../omni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-vendor',
  templateUrl: './review-vendor.component.html',
  styleUrls: ['./review-vendor.component.css']
})
export class ReviewVendorComponent implements OnInit {
	thisreview = new Review();
  constructor(private _omniService:OmniService, 
  	private _route: ActivatedRoute, private _router:Router) {
  	this._route.params.subscribe((param)=>{
  		this.thisreview._reviewedVendor = param.id;
  	})
  	this.thisreview._byUser = JSON.parse(localStorage.getItem('currentUser.user.id'));
   }

  ngOnInit() {
  }

  review_vendor(){
  	this.thisreview.rating = Math.floor(this.thisreview.rating);
  	this._omniService.review_vendor(this.thisreview)
          .then(something => {
            this._router.navigate(['/user', JSON.parse(localStorage.getItem('currentUser.user.alias'))]);
          })
          .catch(err => {
            console.log('Review-catch error:', err);
            //this.errors = err;
          })
  }

}
