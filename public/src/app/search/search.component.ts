import { Component, OnInit } from '@angular/core';

import { OmniService } from './../omni.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _omniService:OmniService) { }

  ngOnInit() {
    this.todays_deals()
  }

  listings:any = ''

  todays_deals() {
    console.log('firing')
    this._omniService.todays_deals()
    .then(data => this.listings = data)
    .catch(data => console.log(data))
  }

}
