import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {

  constructor(private router: Router) { }

  clickToContact() {
    this.router.navigate(['/contact-us']);
  }

}
