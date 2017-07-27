import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class PaymentService {

  constructor(private _http: Http) { }

  processPayment(userId, token, amount){
	  let body = {
		  token: token,
		  amount: amount,
		  userId: userId
	  }
	  console.log("Service token: ", token)
	  console.log("Service, amount: ", amount)
	  return this._http.post("/api/payment", body)
	  .map(data => data.json())
	  .toPromise()
  }

}
