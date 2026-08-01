import { CommonModule } from '@angular/common';
import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, FormsModule],
template:`<section class="min-h-screen bg-gray-100 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 overflow-hidden">

  <!-- Header -->
  <div class="text-center mb-10 sm:mb-12">
    <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">
      Student & Parent <span class="text-amber-700">Testimonials</span>
    </h1>
    <p class="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
      Hear from students and parents who have experienced our professional guidance,
      transparent processes, and dedicated support throughout their higher education journey.
    </p>
  </div>

  <!-- Carousel Wrapper -->
  <div class="max-w-7xl mx-auto relative px-2 sm:px-6 lg:px-10">

    <!-- Left Button -->
    <button
      (click)="prev()"
      class="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2
             bg-white shadow-lg rounded-full
             w-10 h-10 sm:w-12 sm:h-12
             flex items-center justify-center
             hover:bg-blue-500 hover:text-white
             transition z-10"
    >
      ‹
    </button>

    <!-- Cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
             gap-6 sm:gap-8
             transition-all duration-700 ease-in-out"
    >
      <div
        *ngFor="let t of displayedTestimonials; trackBy: trackByName"
        class="bg-white rounded-2xl shadow-md p-6
               hover:shadow-2xl hover:-translate-y-2
               transition-all duration-500"
      >
        <div class="flex items-center mb-4">
          <div
            class="w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white
                   flex items-center justify-center font-bold"
            [ngClass]="t.color"
          >
            {{ t.initial }}
          </div>

          <div class="ml-3">
            <h3 class="font-semibold text-sm sm:text-base">{{ t.name }}</h3>
            <p class="text-xs sm:text-sm text-gray-500">
              {{ t.role }}, {{ t.location }}
            </p>
          </div>
        </div>

        <p class="text-gray-600 italic text-sm sm:text-base leading-relaxed">
          "{{ t.message }}"
        </p>
      </div>
    </div>

    <!-- Right Button -->
    <button
      (click)="next()"
      class="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2
             bg-white shadow-lg rounded-full
             w-10 h-10 sm:w-12 sm:h-12
             flex items-center justify-center
             hover:bg-blue-500 hover:text-white
             transition z-10"
    >
      ›
    </button>

  </div>
</section>`
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
