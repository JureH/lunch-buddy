import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Choice } from "../components/choices-list/choices-list.component";
import { Chat } from "../components/chat/chat.component";
import { Restaurant } from "../classes/restaurant";
import { Comment } from "../classes/comment";
import { User } from "../classes/user";
import { AuthResponse } from "../classes/auth-response";
import { environment } from 'src/environments/environment';
import { BROWSER_STORAGE } from "../classes/storage";

@Injectable({
  providedIn: 'root'
})

export class DatabaseDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) {}
  private apiUrl = environment.apiUrl;
  
  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }
  
  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  private makeAuthApiCall(
    urlPath: string,
    user: User
  ): Observable<AuthResponse> {
    const url: string = `${this.apiUrl}/${urlPath}`;
    let body = new HttpParams().set("email", user.email).set("username", user.username);
    if (user.password) body = body.set("password", user.password);
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http
      .post<AuthResponse>(url, body, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  public getChoices(
    date: string,
    lunchTimeFilter: string
  ): Observable<Choice[]> {
    const url: string = `${this.apiUrl}/choice?date=${date}&lunch_time=${lunchTimeFilter}`;
    return this.http
      .get<Choice[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getRestaurants(
    restaurantId?: string,
  ): Observable<Restaurant[]> {
    const url: string = restaurantId
      ? `${this.apiUrl}/restaurants/${restaurantId}`
      : `${this.apiUrl}/restaurants`;
    
    return this.http
      .get<Restaurant[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getRestaurantDetails(restaurantId: string): Observable<Restaurant> {
    const url: string = `${this.apiUrl}/restaurants/${restaurantId}`;
    return this.http
      .get<Restaurant>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  public addCommentToRestaurant(
    restaurantId: string,
    comment: Comment
  ): Observable<Comment> {
    const url: string = `${this.apiUrl}/restaurants/${restaurantId}/comments`;
    let body = new HttpParams()
      .set("comment", comment.comment);
    let headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("Authorization", `Bearer ${this.storage.getItem("demo-token")}`);
    return this.http
      .post<Comment>(url, body, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  public deleteCommentFromRestaurant(
    restaurantId: string,
    commentId: string
  ): Observable<any> {
    const url: string = `${this.apiUrl}/restaurants/${restaurantId}/comments/${commentId}`;
    let headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.storage.getItem("demo-token")}`
    );
    return this.http
      .delete(url, {headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  public getChat(
    chatId?: string,
  ): Observable<Chat[]> {
    const url: string = chatId
      ? `${this.apiUrl}/chat/${chatId}`
      : `${this.apiUrl}/chat`;
    
    return this.http
      .get<Chat[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error.message || error.statusText);
  }
}