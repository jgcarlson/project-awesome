import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterService } from './services/router.service';

import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { PollComponent } from './poll/poll.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouterService] },
  { path: 'add', component: AddComponent, canActivate: [RouterService] },
  { path: 'poll/:id', component: PollComponent, canActivate: [RouterService] },
  {path: '**', component: DashboardComponent, canActivate: [RouterService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
