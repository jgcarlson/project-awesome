import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from '../.././payment.service';
import { environment } from '../../.././environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {




  constructor(private _paymentService: PaymentService) {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  @Input() userBasket
  @Output() checkoutSuccessEmitter = new EventEmitter()
  subTotal: number = 0
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
		  amount: this.subTotal*100,
		  token: token => {
			  this._paymentService.processPayment(this.currentUser.user.id, token, this.amount)
			  .then( data => {
				  console.log("Successful payment: ", data);
				  this.checkoutSuccess();
			  })
			  .catch( err => {
				  console.log(err)
			  })
		  }
	  });
	  this.subTotal = this.calcTotal(this.userBasket)
	  console.log("subTotal: ", this.subTotal)
  }



  handlePayment(){
	  let stripeAmount = this.subTotal*100
	  this.handler.open({
		  name: "Checkout",
		  description: "Choose your pament method",
		  amount: stripeAmount,
		  bitcoin: true
	  });
  }

  calcTotal(basket){
	  for(let i=0; i<basket.length; i++){
		  console.log(basket[i])
		  this.subTotal += basket[i].price;
	  }
	  return this.subTotal;
  }

  checkoutSuccess(){
	this.checkoutSuccessEmitter.emit(1)
  }


  // @HostListener('window:popstate'){
  //  onPopstate(){
  //   this.handler.close()
  //  }
  // }

}
