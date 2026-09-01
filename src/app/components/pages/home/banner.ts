import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { URLS } from '../../../urls/URLS';
import { MessageService } from 'primeng/api';

interface BannerItem {
  bannerId: string;
  bannerTitle: string;
  bannerTag: string;
  bannerStatus: boolean;
  bannerURL: string;
  createdAt: string | null;
  updatedAt: string | null;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `
    <div
      class="block mt-2 mb-4 sm:mb-6 md:mb-8 md:mt-3 mx-2 md:mx-3 relative overflow-hidden rounded-2xl shadow-2xl"
    >
      @if (banners().length > 0) {
        <img
          [src]="imageSrc()"
          [alt]="currentBanner()?.bannerTitle || 'banner'"
          class="w-full h-auto max-h-[160px] sm:max-h-[240px] md:max-h-[320px] lg:max-h-[400px] rounded-2xl object-contain transition-all duration-500 ease-in-out"
        />
      }
    </div>
  `,
})
export class Banner implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private apiUrl = `${URLS.backendapi}/banner`;
  private imageBaseUrl = 'https://api.mbcareersolutions.in/api/images/';

  // Signals for state management
  banners = signal<BannerItem[]>([]);
  currentIndex = signal<number>(0);

  // Computed signal for the current banner object
  currentBanner = computed(() => this.banners()[this.currentIndex()]);

  // Computed signal for current image URL
  imageSrc = computed(() => {
    const active = this.currentBanner();
    return active ? `${this.imageBaseUrl}${active.bannerURL}` : '';
  });

  private timerId: any = null;

  ngOnInit() {
    this.getImagesData();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  getImagesData() {
    this.http.get<BannerItem[]>(this.apiUrl).subscribe({
      next: (data) => {
        const activeBanners = data.filter((item) => item.bannerStatus);
        this.banners.set(activeBanners);

        if (activeBanners.length > 1) {
          this.startAutoSlide();
        }
      },
      error: () => {
        this.showError('Error', 'Failed to fetch banner data');
      },
    });
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.timerId = setInterval(() => {
      this.currentIndex.update((index) => (index + 1) % this.banners().length);
    }, 4500);
  }

  stopAutoSlide() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  selectSlide(index: number) {
    this.currentIndex.set(index);
    this.startAutoSlide();
  }

  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 3000,
    });
  }
}
