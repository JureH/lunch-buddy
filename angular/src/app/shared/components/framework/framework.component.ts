import { Component, OnInit } from "@angular/core";
import { User } from "../../classes/user";
import { AuthenticationService } from "../../services/authentication.service";
import { HistoryService } from "../../services/history.service";

@Component({
  selector: "app-framework",
  templateUrl: "./framework.component.html",
  styles: [],
})

export class FrameworkComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
    ) {}
  public logout(): void {
    this.authenticationService.logout();
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  public getCurrentUser(): string {
    const user: User | null = this.authenticationService.getCurrentUser();
    return user ? user.username : "Guest";
  }
}