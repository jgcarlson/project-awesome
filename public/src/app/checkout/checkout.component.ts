import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '.././payment.service';
import { environment } from '../.././environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {




  constructor(private _paymentService: PaymentService) {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  currentUser: any;
  handler: any;
  amount: 500;
  total: "$5.00"

  
  ngOnInit() {
	  console.log(this.currentUser)
	  this.handler = StripeCheckout.configure({
		  key: environment.stripeKey,
		  image: "http://localhost:5000/assets/images/llama.png",
		  locale: "auto",
		  currency: "usd",
		  amount: this.amount,
		  bitcoin: "true",
		  token: token => {
			  this._paymentService.processPayment(this.currentUser.user.id, token, this.amount)
			  .then( data => {
				  console.log("Successful payment: ", data)
			  })
			  .catch( err => {
				  console.log(err)
			  })
		  }
	  });

  }

  handlePayment(){
	  let stripeAmount = this.amount

	  this.handler.open({
		  name: "Test name",
		  description: "Total Amount: " + this.total,
		  amount: stripeAmount,
		  bitcoin: true
	  });
  }

  // @HostListener('window:popstate'){
  //  onPopstate(){
  //   this.handler.close()
  //  }
  // }

}


// token: token => {
// 	this._paymentService.processPayment(token, this.amount)
// }
