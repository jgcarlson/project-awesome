import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '.././payment.service';
import { environment } from '../.././environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  handler: any;
  amount: 500;
  total: "$5.00"


  constructor(private _paymentService: PaymentService) {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  currentUser: any;

  ngOnInit() {
	  console.log(this.currentUser)
	  this.handler = StripeCheckout.configure({
		  key: environment.stripeKey,
		  image: "http://localhost:5000/assets/images/llama.png",
		  locale: "auto",
		  token: token => {
			  console.log("Token: ", token)
			  console.log("Amount: ", this.amount)
			  this._paymentService.processPayment(this.currentUser.user.id, token, this.amount)
		  }
	  });

  }

  handlePayment(){
	  this.handler.open({
		  name: "Test name",
		  description: "Total Amount: " + this.total,
		  amount: this.amount
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
