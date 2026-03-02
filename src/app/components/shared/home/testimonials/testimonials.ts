import { CommonModule } from '@angular/common';
import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {

  testimonials: Testimonial[] = [
    {
      name: 'Rahul Sharma',
      role: 'Student',
      location: 'Hyderabad',
      message: 'The guidance and transparency throughout my admission process was outstanding.',
      initial: 'R',
      color: 'bg-blue-500'
    },
    {
      name: 'Sneha Reddy',
      role: 'Parent',
      location: 'Vijayawada',
      message: 'Very professional team. They helped my daughter secure admission smoothly.',
      initial: 'S',
      color: 'bg-amber-600'
    },
    {
      name: 'Arjun Kumar',
      role: 'Student',
      location: 'Warangal',
      message: 'Their support during counseling made the process stress-free.',
      initial: 'A',
      color: 'bg-green-500'
    },
    {
      name: 'Lakshmi Devi',
      role: 'Parent',
      location: 'Guntur',
      message: 'Highly transparent and supportive throughout the journey.',
      initial: 'L',
      color: 'bg-purple-500'
    },
    {
      name: 'Kiran Teja',
      role: 'Student',
      location: 'Nellore',
      message: 'Excellent service and proper follow-ups. Highly recommended.',
      initial: 'K',
      color: 'bg-red-500'
    },    {
      name: 'Ravanth Kumar',
      role: 'Student',
      location: 'Hyderabad',
      message: 'The guidance and transparency throughout my admission process was outstanding.',
      initial: 'R',
      color: 'bg-blue-500'
    }
  ];

  displayedTestimonials: Testimonial[] = [];
  currentIndex = 0;
  itemsPerPage = 3;

  ngOnInit() {
    this.updateItemsPerPage();
    this.updateDisplayedTestimonials();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerPage();
    this.updateDisplayedTestimonials();
  }

  updateItemsPerPage() {
    const width = window.innerWidth;

    if (width < 768) {
      this.itemsPerPage = 1;   // Mobile
    } else if (width < 1024) {
      this.itemsPerPage = 2;   // Tablet
    } else {
      this.itemsPerPage = 3;   // Desktop
    }
  }

  updateDisplayedTestimonials() {
    this.displayedTestimonials =
      this.testimonials.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.testimonials.length) {
      this.currentIndex += this.itemsPerPage;
    } else {
      this.currentIndex = 0;
    }
    this.updateDisplayedTestimonials();
  }

  prev() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
    } else {
      this.currentIndex =
        Math.max(this.testimonials.length - this.itemsPerPage, 0);
    }
    this.updateDisplayedTestimonials();
  }

  trackByName(index: number, item: Testimonial) {
    return item.name;
  }
}

interface Testimonial {
  name: string;
  role: string;
  location: string;
  message: string;
  initial: string;
  color: string;
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}


function updateItemsPerPage() {
  throw new Error('Function not implemented.');
}


function updateDisplayedTestimonials() {
  throw new Error('Function not implemented.');
}


function next() {
  throw new Error('Function not implemented.');
}


function prev() {
  throw new Error('Function not implemented.');
}


function trackByName(index: any, number: any, item: any, Testimonial: any) {
  throw new Error('Function not implemented.');
}
