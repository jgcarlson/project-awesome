import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OmniService } from './../omni.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _omniService:OmniService, private _route: ActivatedRoute) {
    this._route.params.subscribe((param)=>{
          console.log("searchComponent loaded and url search_criteria given is: ", param.search_critera);
          this.query = param.search_criteria;
      })
  }

  ngOnInit() {
    this._omniService.find_item(this.query)
    .then(results => {
      this.listings = results;
      console.log(results);
    })

    .catch(err => {
      console.log('Search-catch error:', err);
      //this.errors = err;
    })
  }

  listings:any = '';
  query = '';


}
