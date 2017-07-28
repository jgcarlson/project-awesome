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
	  return this._http.post("/api/payment", body)
	  .map(data => data.json())
	  .toPromise()
  }

}
