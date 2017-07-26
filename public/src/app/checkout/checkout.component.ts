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


  constructor(private _paymentService: PaymentService) { }

  ngOnInit() {
	  this.handler = StripeCheckout.configure({
		  key: environment.stripeKey,
		  image: "http://localhost:5000/assets/images/llama.png",
		  locale: "auto",
	  });

  }

  handlePayment(){
	  this.handler.open({
		  name: "Test name",
		  description: "Test description",
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
