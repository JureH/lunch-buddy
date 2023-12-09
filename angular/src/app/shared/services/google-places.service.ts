import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  private apiKey = 'private';

  constructor(private http: HttpClient) { }

  getPlacePredictions(input: string) {
    const url = `/api/maps/api/place/autocomplete/json?input=${input}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getPlaceDetails(placeId: string) {
    const url = `/api/maps/api/place/details/json?place_id=${placeId}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}