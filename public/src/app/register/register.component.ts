import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../models/user';

import { OmniService } from './../omni.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _omniService:OmniService, private _router:Router) {}

  ngOnInit() {
  }

  user:User = new User();

  initial:boolean = true;
  agree:boolean = null;

  register() {
    this._omniService.register_user(this.user)
    .then(data => {
      if (data) {
        this._router.navigate(['/']);
      } else {
        // TODO: display error message
      }
    })
  }


}
