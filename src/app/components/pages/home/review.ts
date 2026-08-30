import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormSubmissionService } from '../../../services/form-submission.service';
import { URLS } from '../../../urls/URLS';

interface ReviewData {
  id: number;
  fullName: string;
  dob: string;
  phone: string;
  email: string;
  gender: string;
  aadharNo: string;
  address: string;
  visibleStatus: boolean;
  feedback: string;
  signature: string;
  createdAt: string;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading()) {
      <div class="flex min-h-screen items-center justify-center bg-gray-50">
        <div class="flex items-center space-x-3">
          <div class="h-6 w-6 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <span class="text-lg font-semibold text-gray-700">Loading Reviews...</span>
        </div>
      </div>
    } @else {
      <div
        class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-16 sm:px-6 lg:px-8"
        (mouseenter)="pauseAutoSlide()"
        (mouseleave)="startAutoSlide()"
      >
        <div class="mx-auto max-w-3xl text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p class="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            Real feedback from people who experienced our services.
          </p>
        </div>

        <div class="relative mx-auto max-w-7xl">
          @if (reviews().length > 0) {
            <div class="overflow-hidden">
              <div
                class="flex transition-transform duration-500 ease-in-out"
                [style.transform]="'translateX(-' + (currentIndex() * (100 / visibleCardsCount())) + '%)'"
              >
                @for (item of reviews(); track item.id) {
                  <div
                    class="w-full shrink-0 px-3 lg:w-1/3"
                  >
                    <div
                      class="group relative h-full overflow-hidden rounded-2xl border border-gray-100
                             bg-white p-6 shadow-sm transition-all duration-300
                             hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                    >
                      <div class="absolute right-5 top-5 text-5xl font-serif text-gray-100 select-none">“</div>

                      <p class="relative mb-6 text-[15px] leading-7 text-gray-600 z-10">
                        "{{ item.feedback }}"
                      </p>

                      <div>
                        <div class="mb-5 h-px bg-gray-100"></div>

                        <div class="flex items-center gap-3">
                          <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center
                                   rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                                   text-sm font-bold text-white shadow-sm"
                          >
                            {{ item.fullName?.charAt(0)?.toUpperCase() }}
                          </div>

                          <div>
                            <h3 class="font-semibold text-gray-900">
                              {{ item.fullName }}
                            </h3>
                            <p class="text-sm text-gray-500">Verified Customer</p>
                          </div>

                          <div
                            class="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-100"
                          >
                            <span class="text-xs text-green-600 font-bold">✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <button
              type="button"
              (click)="prevSlide()"
              class="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-gray-700 shadow-md transition hover:bg-gray-50 focus:outline-none sm:-left-6 z-20"
              aria-label="Previous Slide"
            >
              &#10094;
            </button>

            <button
              type="button"
              (click)="nextSlide()"
              class="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-gray-700 shadow-md transition hover:bg-gray-50 focus:outline-none sm:-right-6 z-20"
              aria-label="Next Slide"
            >
              &#10095;
            </button>

            <div class="mt-8 flex justify-center gap-2">
              @for (dot of totalPagesArray(); track $index) {
                <button
                  type="button"
                  (click)="goToSlide($index)"
                  class="h-2.5 rounded-full transition-all duration-300"
                  [class]="currentIndex() === $index ? 'w-8 bg-indigo-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'"
                  [aria-label]="'Go to slide ' + ($index + 1)"
                ></button>
              }
            </div>
          } @else {
            <p class="text-center text-gray-500">No reviews available at the moment.</p>
          }
        </div>
      </div>
    }
  `,
})
export class ReviewComponent implements OnInit, OnDestroy {
  private formSubmission = inject(FormSubmissionService);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = `${URLS.backendapi}/student-reviews`;

  loading = signal<boolean>(true);
  reviews = signal<ReviewData[]>([]);
  currentIndex = signal<number>(0);
  screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  private autoSlideInterval: any = null;

  // Compute how many items to show at once (1 for mobile/tablet, 3 for desktop)
  visibleCardsCount = computed(() => (this.screenWidth() >= 1024 ? 3 : 1));

  // Compute maximum scrollable index limit
  maxIndex = computed(() => {
    const total = this.reviews().length;
    const visible = this.visibleCardsCount();
    return Math.max(0, total - visible);
  });

  // Calculate pages for pagination indicators
  totalPagesArray = computed(() => {
    const pages = this.maxIndex() + 1;
    return pages > 0 ? new Array(pages) : [];
  });

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth.set(window.innerWidth);
      if (this.currentIndex() > this.maxIndex()) {
        this.currentIndex.set(this.maxIndex());
      }
    }
  }

  ngOnInit() {
    this.fetchReviews();
  }

  ngOnDestroy() {
    this.pauseAutoSlide();
  }

  fetchReviews() {
    this.formSubmission.getAll<ReviewData[]>(this.apiUrl).subscribe({
      next: (response: ReviewData[]) => {
        this.reviews.set(response || []);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('reviewData', JSON.stringify(response));
        }
        this.loading.set(false);
        this.startAutoSlide();
      },
      error: (error) => {
        console.error('Failed to load reviews:', error);
        this.loadFallbackFromStorage();
        this.loading.set(false);
      },
    });
  }

  private loadFallbackFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('reviewData');
      if (storedData) {
        this.reviews.set(JSON.parse(storedData));
        this.startAutoSlide();
      }
    }
  }

  nextSlide() {
    if (this.currentIndex() >= this.maxIndex()) {
      this.currentIndex.set(0);
    } else {
      this.currentIndex.update((idx) => idx + 1);
    }
  }

  prevSlide() {
    if (this.currentIndex() <= 0) {
      this.currentIndex.set(this.maxIndex());
    } else {
      this.currentIndex.update((idx) => idx - 1);
    }
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
  }

  startAutoSlide() {
    if (!isPlatformBrowser(this.platformId) || this.autoSlideInterval) return;
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  pauseAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}