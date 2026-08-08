import { Component, inject, OnInit } from "@angular/core";
import { FormSubmissionService } from "../../../services/form-submission.service";
import { URLS } from "../../../urls/URLS";

@Component({
    selector: 'app-review',
    imports: [],
    template: `
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-16 sm:px-6 lg:px-8">

  <!-- Section Header -->
  <div class="mx-auto max-w-3xl text-center mb-12">
    <!-- <span class="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-semibold text-yellow-700">
      ⭐ Customer Reviews
    </span> -->

    <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      What Our Customers Say
    </h2>

    <p class="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
      Real feedback from people who experienced our services.
    </p>
  </div>


  <!-- Reviews Grid -->
  <div class="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

    @for (item of data; track item.id) {

      <div
        class="group relative overflow-hidden rounded-2xl border border-gray-100
               bg-white p-6 shadow-sm transition-all duration-300
               hover:-translate-y-1 hover:shadow-xl"
      >

        <!-- Quote Icon -->
        <div class="absolute right-5 top-5 text-5xl font-serif text-gray-100">
          “
        </div>

        <!-- Stars -->
        <!-- <div class="mb-5 flex gap-1">
          <span class="text-lg text-yellow-400">★</span>
          <span class="text-lg text-yellow-400">★</span>
          <span class="text-lg text-yellow-400">★</span>
          <span class="text-lg text-yellow-400">★</span>
          <span class="text-lg text-yellow-400">★</span>
        </div> -->

        <!-- Review -->
        <p class="relative mb-6 text-[15px] leading-7 text-gray-600">
          "{{ item.feedback }}"
        </p>

        <!-- Divider -->
        <div class="mb-5 h-px bg-gray-100"></div>

        <!-- User -->
        <div class="flex items-center gap-3">

          <!-- Avatar -->
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

            <p class="text-sm text-gray-500">
              Verified Customer
            </p>
          </div>

          <!-- Verified -->
          <div class="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
            <span class="text-xs text-green-600">✓</span>
          </div>

        </div>

      </div>

    }

  </div>

</div>
    `
})
export class review implements OnInit {

    private formSubmission = inject(FormSubmissionService);
    private apiUrl = `${URLS.backendapi}/student-reviews`;

    data: any[] = [];

    ngOnInit() {
        this.getLocaleDateFormat();
    }

    getLocaleDateFormat() {
        this.formSubmission.getAll(this.apiUrl).subscribe({
            next: (response: any) => {
                // console.log(response);

                this.data = response;

                console.log("stored data ::::::::::: " + JSON.stringify(this.data));

            }
        });


    }

}