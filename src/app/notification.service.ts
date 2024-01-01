import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationEmitter = new EventEmitter<{ message: string, type: string }>();

  displayNotification(message: string, type: string) {
    this.notificationEmitter.emit({ message, type });
  }
}
