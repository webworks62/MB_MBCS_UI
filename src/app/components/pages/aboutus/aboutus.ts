import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TeamComponent } from '../../shared/aboutus/team/team';

@Component({
  selector: 'app-aboutus',
  imports: [TeamComponent],
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.css',
})
export class Aboutus {

  constructor(private router: Router) { }

  routerToContact(){
    this.router.navigate(['/contact-us']);
  }

}
