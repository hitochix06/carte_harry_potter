import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="show"
      (click)="hide()"
      class="fixed bottom-4 right-4 max-w-sm w-full transform transition-all duration-300 ease-out"
      [class.translate-x-0]="show"
      [class.translate-x-full]="!show"
    >
      <div
        [ngClass]="{
          'bg-green-500': currentNotification?.type === 'success',
          'bg-red-500': currentNotification?.type === 'error',
          'bg-blue-500': currentNotification?.type === 'info'
        }"
        class="rounded-lg shadow-lg p-4 flex items-start space-x-4 cursor-pointer hover:opacity-90"
      >
        <div class="flex-shrink-0">
          <ng-container [ngSwitch]="currentNotification?.type">
            <!-- Success Icon -->
            <svg
              *ngSwitchCase="'success'"
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <!-- Error Icon -->
            <svg
              *ngSwitchCase="'error'"
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <!-- Info Icon -->
            <svg
              *ngSwitchCase="'info'"
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </ng-container>
        </div>
        <div class="flex-1">
          <h4 class="text-white font-medium text-sm">
            {{ currentNotification?.title }}
          </h4>
          <p class="mt-1 text-white text-sm">
            {{ currentNotification?.message }}
          </p>
        </div>
        <!-- Close button -->
        <button class="flex-shrink-0 text-white hover:text-gray-100">
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- Progress bar -->
      <div class="h-1 bg-white bg-opacity-20 rounded-b-lg">
        <div
          class="h-1 bg-white rounded-b-lg transition-all duration-300 ease-linear"
          [style.width.%]="progressWidth"
        ></div>
      </div>
    </div>
  `,
})
export class NotificationComponent implements OnInit, OnDestroy {
  show = false;
  currentNotification?: { message: string; title: string; type: string };
  progressWidth = 100;
  private timeout: any;
  private progressInterval: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications.subscribe((notification) => {
      this.currentNotification = notification;
      this.show = true;
      this.progressWidth = 100;

      if (this.timeout) {
        clearTimeout(this.timeout);
        clearInterval(this.progressInterval);
      }

      // Progress bar animation
      this.progressInterval = setInterval(() => {
        this.progressWidth -= 100 / 30; // Diminue sur 3 secondes (30 * 100ms)
      }, 100);

      this.timeout = setTimeout(() => {
        this.hide();
      }, 3000);
    });
  }

  hide() {
    this.show = false;
    clearInterval(this.progressInterval);
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}
