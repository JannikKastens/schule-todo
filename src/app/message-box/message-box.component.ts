import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {
  message = '';
  messageType = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notificationEmitter.subscribe(({ message, type }: { message: string, type: string }) => {
      this.message = message;
      this.messageType = type;
    });
    console.log('MessageBoxComponent initialized');
  }
}
