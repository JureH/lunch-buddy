import { Component } from '@angular/core';
import { GooglePlacesService } from '../../services/google-places.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: `./add-restaurant.component.html`,
  styles: []
})
export class AddRestaurantComponent {
  searchInput: string = '';
  predictions: any[] = [];

  constructor(private googlePlacesService: GooglePlacesService) {}

  onInputChange() {
    if (this.searchInput.length > 3) { 
      this.googlePlacesService.getPlacePredictions(this.searchInput)
        .subscribe((data: any) => {
          this.predictions = data.predictions;
        });
    } else {
      this.predictions = [];
    }
  }

  onPredictionSelect(placeId: string) {
    this.googlePlacesService.getPlaceDetails(placeId).subscribe((details: any) => {
      // Handle details response and display in your component
    });
  }
}