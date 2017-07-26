import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OmniService } from './../omni.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _omniService:OmniService, private _router:Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    console.log(this.currentUser)
  }

  currentUser:any;

  user:any = {
    alias: '',
    password: ''
  }

  login() {
    this._omniService.login(this.user)
    .then(data => {
      this.currentUser = data;
      console.log(data);
      console.log(this.currentUser);
    })
    .catch(data => console.log('Login-catch data:', data));
    this.user = { alias: '', password: '' };
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._router.navigate(['/']);
    console.log(this.currentUser)
  }





}
