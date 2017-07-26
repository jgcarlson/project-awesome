import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OmniService } from './../omni.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _omniService:OmniService, private _router:Router) { }

  ngOnInit() {
  }

  user:any = {
    alias: '',
    password: ''
  }

  login() {
    this._omniService.login(this.user)
    .then(data => {
      if (data.success) {
        this._router.navigate(['/dashboard']);
      }
    })
    .catch(data => console.log('Login-catch data:', data))
    this.user = { alias: '', password: '' };
  };



}
