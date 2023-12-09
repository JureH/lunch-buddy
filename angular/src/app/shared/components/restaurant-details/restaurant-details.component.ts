import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DatabaseDataService } from '../../services/database-data.service';
import { Restaurant } from '../../classes/restaurant';
import { Comment } from '../../classes/comment';
import { AuthenticationService } from "../../services/authentication.service";
import { User } from "../../classes/user";


@Component({
  selector: 'app-restaurant-details',
  templateUrl: "restaurant-details.component.html",
  styles: [
  ]
})
export class RestaurantDetailsComponent {
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private databaseDataService: DatabaseDataService,
    private authenticationService: AuthenticationService
    ) {}

  @Input() restaurant!: Restaurant;

  protected newComment: Comment = {
    _id: "",
    username: "",
    comment: "",
    date: ""
  };

  protected formDataError: string = "";

  protected addNewComment(): void {
    this.formDataError = "";
    this.newComment.username = this.getCurrentUserId();
    if (this.isFormDataValid()) {
      this.databaseDataService
        .addCommentToRestaurant(this.restaurant._id, this.newComment)
        .subscribe({
          next: (comment: Comment) => {
            this.restaurant?.comments?.unshift(comment);
            this.closeModal();
          },
          error: (err) => {
            this.formDataError = err || "Error adding comment.";
          }
        });
    } else {
      this.formDataError = "Please fill out all fields.";
    }
  }

  protected deleteComment(commentId: string | undefined): void {
    if (commentId) {
      this.databaseDataService
        .deleteCommentFromRestaurant(this.restaurant._id, commentId)
        .subscribe({
          next: () => {
            this.restaurant.comments = this.restaurant.comments?.filter(
              (comment) => comment._id !== commentId
            );
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  private isFormDataValid(): boolean {
    let isValid: boolean = false; // Initialize with false
    if (this.newComment.comment) {
      isValid = true;
    }
    return isValid;
  }

  protected openModal(form: TemplateRef<any>) {
    this.modalRef = this.modalService.show(form, {
      class: "modal-dialog-centered",
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  protected closeModal(): void {
    this.newComment = {
      _id: "",
      username: "",
      comment: "",
      date: ""
    };
    this.formDataError = "";
    this.modalRef?.hide();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getCurrentUser(): string {
    const user: User | null = this.authenticationService.getCurrentUser();
    return user ? user.username : "Guest";
  }

  public getCurrentUserId(): string {
    const user: User | null = this.authenticationService.getCurrentUser();
    return user ? user._id ?? "-1" : "-1";
  }

  public isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  public canDeleteComment(comment: Comment): boolean {
    return this.isLoggedIn() && (this.isAdmin() || comment.username === this.getCurrentUser());
  }
}
