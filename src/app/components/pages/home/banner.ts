import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { URLS } from '../../../urls/URLS';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-banner',
  imports: [],
  template: `

<div class="hidden md:block md:mt-3 mx-3">
  <img
    src="assets/banner/banner.jpeg"
    alt="banner"
    class="w-full h-[120px] sm:h-[220px] md:h-[280px] lg:h-[380px] rounded-2xl object-fit shadow-lg"
  />
</div>

<!-- <div class="mx-4 my-6">
  <img
    src="https://api.mbcareersolutions.in/api/images/0fac2918-2f79-46f4-8663-5502245fd458"
    alt="Fashion Banner"
    class="w-full h-[120px] sm:h-[220px] md:h-[280px] lg:h-[380px] rounded-2xl object-fit shadow-lg"
  />
</div> -->

<!-- <div class="mx-4 my-6">
@if (!imageSrc) {
  <img
    [src]="imageSrc"
    class="w-full h-[120px] sm:h-[220px] md:h-[280px] lg:h-[380px] rounded-2xl object-fit shadow-lg"
  />
}
</div> -->

`
})
export class Banner implements OnInit {

  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private apiUrl = `${URLS.backendapi}/banner`;
  private api = `${URLS.backendapi}/images/upload`;

  imageSrc = '';

  ngOnInit() {
    this.getImagesData();
  }


  getImagesData() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      if (data.length) {
        this.imageSrc =
          `https://api.mbcareersolutions.in/api/images/${data[0].bannerURL}`;
      }
    });
  }



  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 3000
    });
  }
}
