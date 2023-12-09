import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="col-12 col-md-4 mt-4">
      <small class="text-muted" *ngIf="header?.sidebar">{{ header.sidebar }}</small>
    </div>
  `,
  styles: []
})
export class SidebarComponent {
  @Input() content: string = "";
  @Input() header: any;
}
