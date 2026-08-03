import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormSubmissionService } from '../serviceslayer/form-submission.service';
import { URLS } from '../urls/URLS';

@Component({
  selector: 'app-compn',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './compn.html',
  styleUrl: './compn.css',
})
export class Compn implements OnInit, OnDestroy {

  // Countdown
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  targetDate!: Date;
  intervalId: any;

  // Email
  email: string = '';
  message: string = '';
  success: boolean = false;

  API_URL = `${URLS.backendapi}notify`;

  constructor(
    private cd: ChangeDetectorRef,
    private formSubmission: FormSubmissionService,
  ) {}

  ngOnInit() {
    this.targetDate = new Date(2026, 3, 3, 11, 0, 0);
    this.updateCountdown();

    this.intervalId = setInterval(() => {
      this.updateCountdown();
      this.cd.detectChanges();   // 👈 force UI refresh every second
    }, 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(this.intervalId);
      this.days = this.hours = this.minutes = this.seconds = 0;
      return;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    this.minutes = Math.floor((distance / (1000 * 60)) % 60);
    this.seconds = Math.floor((distance / 1000) % 60);
  }

  notifyMe() {
    if (!this.email || !this.email.includes('@')) {
      this.message = 'Please enter a valid email';
      this.success = false;
      return;
    }

    const payload = { email: this.email };

    this.formSubmission.submit(this.API_URL, payload, 'Notification signup').subscribe({
      next: (res) => {
        if (res.success) {
          this.message = '✅ You will be notified!';
          this.success = true;
          this.email = '';
        } else {
          this.message = res.message;
          this.success = false;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}