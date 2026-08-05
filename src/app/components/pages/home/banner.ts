import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { URLS } from '../../../urls/URLS';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-banner',
  imports: [],
  template: `

<!-- <div class="hidden md:block md:mt-3 mx-3">
  <img
    src=""
    alt="banner"
    class="w-full rounded-2xl object-cover"
  />
</div> -->

<div class="mx-4 my-6">
  <img
    src="https://api.mbcareersolutions.in/api/images/a1bae6d9-0e2a-4c32-9c49-736c7b2cbe33"
    alt="Fashion Banner"
    class="w-full h-[120px] sm:h-[220px] md:h-[280px] lg:h-[380px] rounded-2xl object-fit shadow-lg"
  />
</div>

`
})
export class Banner implements OnInit {

  private http = inject(HttpClient);
  private messageService = inject(MessageService);


  private apiUrl = `${URLS.backendapi}/banner`;

  private api = `${URLS.backendapi}/images/upload`;


  ngOnInit() {
    this.getImagesData();
  }

  getImagesData() {

    this.http.get<any>(this.apiUrl).subscribe({

      next: (data: any) => {

        console.log(data);

        // localStorage.removeItem("uploadedImageUrl");

        // this.title = "";
        // this.tags = "";
        // this.status = true;
        // this.imagePreview = null;

      },

      error: () => {

        this.showError(
          "Save Failed",
          "Unable to save banner."
        );

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
