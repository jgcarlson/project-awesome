import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class PaymentService {

  constructor(private _http: Http) { }

  processPayment(token: any, amount){
	  console.log("Service token: ", token)
	  console.log("Service, amount: ", amount)
  }

}
