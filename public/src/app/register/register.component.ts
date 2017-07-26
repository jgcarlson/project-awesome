import { Component, OnInit } from '@angular/core';

import { User } from './../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  user:User = new User();

  initial:boolean = true;
  agree:boolean = null;

  register() {

  }


}
