import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DatabaseDataService } from '../../services/database-data.service';
import { Restaurant } from '../../classes/restaurant';

@Component({
  selector: 'app-details-page',
  templateUrl: `details-page.component.html`,
  styles: []
})
export class DetailsPageComponent implements OnInit {
  constructor(
    private databaseDataService: DatabaseDataService,
    private route: ActivatedRoute
  ) {}
  restaurant!: Restaurant;
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let restaurantId: string = params.get("restaurantId") ?? "";
          return this.databaseDataService.getRestaurantDetails(restaurantId);
        })
      )
      .subscribe((restaurant: Restaurant) => {
        this.restaurant = restaurant;
        this.header = {
          title: restaurant.name,
          subtitle: "",
          sidebar: `Details about ${restaurant.name}`,
        };
      });
  }
  header = {
    title: "",
    subtitle: "",
    sidebar: "",
  };
}