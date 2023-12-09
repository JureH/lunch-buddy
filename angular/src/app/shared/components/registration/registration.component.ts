import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../../classes/user";
import { AuthenticationService } from "../../services/authentication.service";
import { HistoryService } from "../../services/history.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) {}
  protected formError!: string;
  protected credentials: User = {
    username: "",
    email: "",
    password: "",
    role: "user",
  };
  public header = {
    title: "Create a new account",
    subtitle: "",
    sidebar: "",
  };
  public onRegisterSubmit() {
    this.formError = "";
    if (
      !this.credentials.username ||
      !this.credentials.email ||
      !this.credentials.password
    )
      this.formError = "All fields are required, please try again.";
    else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.credentials.email
      )
    )
      this.formError = "Please enter a valid e-mail address.";
    else if (this.credentials.password.length < 3)
      this.formError = "Password must be at least 3 characters long.";
    else this.doRegister();
  }
  private doRegister() {
    this.authenticationService
      .register(this.credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.formError = error.toString();
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl(this.historyService.getLastNonLoginUrl());
      });
  }
}