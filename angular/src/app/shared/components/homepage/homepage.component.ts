import { Component } from "@angular/core";

@Component({
  selector: "app-homepage",
  template: `<app-header [content]="header"></app-header>
    <div class="row">
      <div class="col-12 col-md-4"><app-choices-list></app-choices-list></div>
      <div class="col-12 col-md-4"><app-map></app-map></div>
      <div class="col-12 col-md-4"><app-chat></app-chat></div>
    </div>`,
  styles: [],
})
export class HomepageComponent {
  header = {
    title: "Choices",
    subtitle: "for today",
    sidebar: "See what your coworkers are up to and join them for lunch!",
  };
}