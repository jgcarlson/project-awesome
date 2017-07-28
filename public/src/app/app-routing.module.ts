import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OmniService } from './omni.service';

import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './basket/checkout/checkout.component';
import { ReviewComponent } from './review/review.component';
import { ReviewVendorComponent } from './review-vendor/review-vendor.component';

const routes: Routes = [ // to limit access to only logged in users, add 'canActivate: [OmniService]' to route.
  { path: '', component: LandingComponent },
  { path: 'search/:search_criteria', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'user/:alias', component: ProfileComponent },
  { path: 'user/:alias/basket', component: BasketComponent, canActivate: [OmniService] },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'review_product/:id', component: ReviewComponent},
  { path: 'review_vendor/:id', component: ReviewVendorComponent},
  { path: '**', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
