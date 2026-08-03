import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { floatcontact } from "../components/pages/reviews/flotcontact";



@Component({
    selector: 'app-scholarship',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <!-- Floating Contact Form Trigger Button -->
  

    <!-- Modal Backdrop & Form Container -->
 

    <!-- Header & Main Directory Content -->
 


  `
})
export class Scholarship {
    searchQuery = '';
    isModalOpen = signal(false);


 



}