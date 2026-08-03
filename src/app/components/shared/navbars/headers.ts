import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="fixed top-0 left-0 w-full bg-gray-200 shadow-md z-50">
      <div class="max-w-7xl mx-auto">

        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3">

          <!-- Logo -->
          <div
            routerLink="/"
            class="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="assets/mb-logo.png"
              alt="MB Careers Logo"
              class="w-10 h-10 object-contain"
            />

            <h1 class="text-lg font-bold uppercase tracking-wide">
              {{ title() }}
            </h1>
          </div>

          <!-- Desktop Menu -->
          <ul
            class="hidden md:flex items-center gap-8 uppercase text-sm font-medium"
          >
            @for (link of navbarLinks; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  class="hover:text-amber-700 transition-colors duration-200"
                >
                  {{ link.name }}
                </a>
              </li>
            }
          </ul>

          <!-- Mobile Button -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-gray-300"
            (click)="toggleMenu()"
          >
            @if (!isMenuOpen()) {
              <!-- Hamburger -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            } @else {
              <!-- Close -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7"
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
            }
          </button>

        </div>

        <!-- Mobile Menu -->
        @if (isMenuOpen()) {
          <div class="md:hidden border-t bg-gray-200">
            <ul class="flex flex-col py-2">

              @for (link of navbarLinks; track link.path) {
                <li>
                  <a
                    [routerLink]="link.path"
                    (click)="closeMenu()"
                    class="block px-5 py-3 uppercase hover:bg-gray-300 transition"
                  >
                    {{ link.name }}
                  </a>
                </li>
              }

            </ul>
          </div>
        }

      </div>
    </nav>

    <!-- Spacer -->
    <div class="h-16"></div>
  `
})
export class Headers {

  protected readonly title = signal('MB Groups');

  protected readonly isMenuOpen = signal(false);

  navbarLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Courses', path: '/courses' },
    { name: 'scholarship', path: '/scholarship' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact-us' }
  ];

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

}