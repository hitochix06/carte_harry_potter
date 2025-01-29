import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="show"
      (click)="hide()"
      class="fixed top-4 right-4 max-w-sm w-full transform transition-all duration-300 ease-out"
      [class.translate-x-0]="show"
      [class.translate-x-full]="!show"
    >
      <div
        [ngClass]="{
          'bg-[#740001]': currentNotification?.type === 'success',
          'bg-[#1a472a]': currentNotification?.type === 'error',
          'bg-[#2a3152]': currentNotification?.type === 'info'
        }"
        class="rounded-lg shadow-lg p-4 flex items-start space-x-4 cursor-pointer hover:opacity-90 border-2 border-[#d3a625]"
      >
        <div class="flex-shrink-0">
          <ng-container [ngSwitch]="currentNotification?.type">
            <!-- Success Icon -->
            <svg
              *ngSwitchCase="'success'"
              class="h-6 w-6 text-[#d3a625]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3l14 9-14 9V3z"
              />
            </svg>
            <!-- Error Icon -->
            <svg
              *ngSwitchCase="'error'"
              class="h-6 w-6 text-[#d3a625]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <!-- Info Icon -->
            <svg
              *ngSwitchCase="'info'"
              class="h-6 w-6 text-[#d3a625]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v8m0-8l-2 2m2-2l2 2"
              />
            </svg>
          </ng-container>
        </div>
        <div class="flex-1">
          <h4 class="text-[#d3a625] font-medium text-sm font-['Cinzel']">
            {{ currentNotification?.title }}
          </h4>
          <p class="mt-1 text-white text-sm font-['Cinzel']">
            {{ currentNotification?.message }}
          </p>
        </div>
        <!-- Close button -->
        <button class="flex-shrink-0 text-[#d3a625] hover:text-white">
          <svg
            class="h-5 w-5 transform rotate-45"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3l14 9-14 9V3z"
            />
          </svg>
        </button>
      </div>
      <!-- Progress bar -->
      <div class="h-1 bg-[#2a3152] bg-opacity-20 rounded-b-lg">
        <div
          class="h-1 bg-[#d3a625] rounded-b-lg transition-all duration-300 ease-linear"
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
