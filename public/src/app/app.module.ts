import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/primeng';

import { OmniService } from './omni.service';
import { PaymentService } from './payment.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './basket/checkout/checkout.component';
import { NgbdCarouselConfig } from './landing/carousel/carousel.component';
import { NgbdRatingConfig } from './rating/rating.component';
import { ReviewComponent } from './review/review.component';
import { ReviewVendorComponent } from './review-vendor/review-vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    SearchComponent,
    ProductComponent,
    ProfileComponent,
    RegisterComponent,
    BasketComponent,
    CheckoutComponent,
    NgbdCarouselConfig,
    NgbdRatingConfig,
    ReviewComponent,
    ReviewVendorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    FileUploadModule,
    NgbModule.forRoot()
  ],
  providers: [
    OmniService,
    NgbCarouselConfig,
    PaymentService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
