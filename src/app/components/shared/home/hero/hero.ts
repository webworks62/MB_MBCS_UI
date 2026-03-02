import { routes } from './../../../../app.routes';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `<div
    class="min-h-screen w-full bg-white flex items-center justify-center px-1.5 sm:px-1.5 lg:px-5"
  >
    <!-- INNER CARD -->
    <div
      class="w-full max-w-7xl bg-gradient-to-br from-blue-50 via-gray-100 to-slate-50
           rounded-xl border border-gray-300
           shadow-[inset_0_8px_20px_rgba(0,0,0,0.15)]
           py-10 sm:py-14 px-6 sm:px-10"
    >
      <!-- CONTENT WRAPPER -->
      <div class="flex flex-col md:flex-row items-center gap-12">
        <!-- TEXT CONTENT -->
        <div class="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Shape Your <span class="text-amber-700">Future</span> With Trusted Career Guidance
          </h1>

          <p class="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            MB Consultancy provides personalized academic and career counseling, helping students
            secure admissions to top colleges, universities, and international institutions through
            expert guidance and end-to-end application support.
          </p>

          <!-- CTA + SOCIAL -->
          <div class="flex flex-col sm:flex-row items-center md:items-start gap-5 pt-4">
            <button
              class="px-7 py-3 bg-amber-700 text-white rounded-lg shadow-md
                   hover:bg-amber-800 transition"
                   (click)="RouteTo()"
            >
              Get Started
            </button>

            <ul class="flex gap-3">
              <!-- Instagram -->
              <li
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                     text-white text-xl sm:text-2xl bg-black
                     hover:bg-gradient-to-r hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]
                     transition duration-300"
                (click)="openLink('https://www.instagram.com/mb_career.solutions')"
              >
                <a href=""></a>
                <i class="pi pi-instagram"></i>
              </li>

              <!-- LinkedIn -->
              <li
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                     text-white text-xl sm:text-2xl bg-black
                     hover:bg-blue-500 transition duration-300"
              >
                <i class="pi pi-linkedin"></i>
              </li>

              <!-- Facebook -->
              <li
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                     text-white text-xl sm:text-2xl bg-black
                     hover:bg-blue-800 transition duration-300"
                     (click)="openLink('https://www.facebook.com/profile.php?id=61575829737856')"
              >
                <i class="pi pi-facebook"></i>
              </li>
            </ul>
          </div>
        </div>

        <!-- IMAGE CONTENT -->
        <div class="w-full md:w-1/2 flex justify-center">
          <img
            src="/assets/images/two-businessmen.jpg"
            alt="Career Guidance Illustration"
            class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
                 object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div> `,
})
export class Hero {
  constructor(private routes:Router) {}

  RouteTo(){
    this.routes.navigate(['/courses']);
  }

  openLink(url: string) {
    window.open(url, '_blank')?.focus();
  }
  // implements AfterViewInit
  // @ViewChild('typedText', { static: false })
  // typedElement!: ElementRef;
  // ngAfterViewInit(): void {
  //   const options = {
  //     strings: [
  //       'Entrance Exam',
  //       'Admission',
  //       'Higher Education',
  //       'Scholarship',
  //       'Colleges',
  //       'Universities',
  //       'Career',
  //     ],
  //     typeSpeed: 80,
  //     backSpeed: 60,
  //     loop: true,
  //   };
  //   new Typed(this.typedElement.nativeElement, options);
  // }
}
