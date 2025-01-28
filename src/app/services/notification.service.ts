import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  title: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification$ = new Subject<Notification>();
  notifications = this.notification$.asObservable();

  show(
    message: string,
    title: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) {
    this.notification$.next({ message, title, type });
  }
}
