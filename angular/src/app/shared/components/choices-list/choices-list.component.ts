import { Component, OnInit } from '@angular/core';
import { DatabaseDataService } from '../../services/database-data.service';

@Component({
  selector: 'app-choices-list',
  templateUrl: `./choices-list.component.html`,
  styles: [],
})
export class ChoicesListComponent implements OnInit {
  constructor(private databaseDataService: DatabaseDataService) {
    this.choices = [];
  }

  ngOnInit() {
    this.getCurrentDate();
    this.getChoices();
  }
  public lunchTimeFilter: string = '';
  public filteredChoices: Choice[] = [];
  private currentDate: string = '';
  protected choices: Choice[];
  protected restaurantCounts: { [restaurant: string]: number } = {};

  showAll: boolean = false;
  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  private getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }
  public applyFilter() {
    this.filteredChoices = this.choices.filter(choice =>
      choice.lunch_time.includes(this.lunchTimeFilter)
    );
    this.calculateRestaurantCounts();
  }

  private getChoices() {
    this.databaseDataService
      .getChoices(this.currentDate, this.lunchTimeFilter)
      .subscribe((choices) => {
        this.choices = choices;
        this.applyFilter();
      });
  }

  private calculateRestaurantCounts() {
    this.restaurantCounts = {};

    this.filteredChoices.forEach((choice) => {
      const restaurant = choice.restaurant;
      this.restaurantCounts[restaurant] = (this.restaurantCounts[restaurant] || 0) + 1;
    });
  }
  getRestaurantKeys(): string[] {
    return Object.keys(this.restaurantCounts).sort((a, b) => {
      return Number(this.restaurantCounts[b]) - Number(this.restaurantCounts[a]);
    });
  }
}

export class Choice {
  _id!: string;
  username!: string;
  restaurant!: string;
  date!: string;
  lunch_time!: string;
}
