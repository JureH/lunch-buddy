import { Component, OnInit } from '@angular/core';
import { DatabaseDataService } from '../../services/database-data.service';

@Component({
  selector: 'app-chat',
  templateUrl: "./chat.component.html",
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  constructor(private databaseDataService: DatabaseDataService) {
    this.chats = [];
  }

  ngOnInit() {
    this.getChat();
  }

  protected chats: Chat[];

  private getChat() {
    this.databaseDataService
      .getChat()
      .subscribe((chats: Chat[]) => {  
        if (chats && chats.length > 0) {
          this.chats = chats;
        } else {
          console.warn('No chats received or the array is empty.');
        }
      });
  }
}

export class Chat {
  _id!: string;
  username!: string;
  comment!: string;
  date!: string;
}