import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OmniService } from './omni.service';

import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
