import { Component, OnInit } from '@angular/core';

import { OmniService } from './../omni.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private _omniService:OmniService) { }

  ngOnInit() {
    this.todays_deals()
  }

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

}
