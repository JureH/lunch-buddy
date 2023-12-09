import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseDataService } from '../../services/database-data.service';
import { Restaurant } from '../../classes/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: "./restaurant-list.component.html",
  styles: []
})
export class RestaurantListComponent implements OnInit {
  constructor(
    private databaseDataService: DatabaseDataService,
    private router: Router
  ) {
    this.restaurants = [];
  }
  
  ngOnInit() {
    this.getRestaurants();
  }

  protected restaurants: Restaurant[];

  private getRestaurants() {
    this.databaseDataService
      .getRestaurants()
      .subscribe((restaurants: Restaurant[]) => { 
        this.restaurants = restaurants;
      });
  }

  navigateToAddRestaurant() {
    this.router.navigate(['/add-restaurant']);
  }
}



