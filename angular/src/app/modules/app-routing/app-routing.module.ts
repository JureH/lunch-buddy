import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from '../../shared/components/homepage/homepage.component';
import { RestaurantListComponent } from '../../shared/components/restaurant-list/restaurant-list.component';
import { LoginComponent } from '../../shared/components/login/login.component';
import { RegistrationComponent } from '../../shared/components/registration/registration.component';
import { AddRestaurantComponent } from '../../shared/components/add-restaurant/add-restaurant.component';
import { DetailsPageComponent } from '../../shared/components/details-page/details-page.component';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "restaurants", component: RestaurantListComponent },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "add-restaurant", component: AddRestaurantComponent },
  { path: "restaurants/:restaurantId", component: DetailsPageComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
