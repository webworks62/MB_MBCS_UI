import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compn',
  imports: [],
  templateUrl: './compn.html',
  styleUrl: './compn.css',
})
export class Compn implements OnInit {

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  targetDate = new Date();
  
  ngOnInit() {
    // Set launch date here (YYYY, MM-1, DD, HH, MM, SS)
    this.targetDate = new Date(2026, 2, 30, 10, 0, 0);

    setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      this.minutes = Math.floor((distance / (1000 * 60)) % 60);
      this.seconds = Math.floor((distance / 1000) % 60);
    }, 1000);
  }
}
