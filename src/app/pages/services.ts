import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [CommonModule, FormsModule],
template:`<section class="min-h-screen bg-gray-100 pt-24 pb-16 px-6">
  <!-- Page Header -->
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold text-gray-800">
      Our <span class="text-amber-700">Services</span>
    </h1>
    <p class="text-gray-600 mt-3 max-w-xl mx-auto">
      We specialize in post-intermediate student support, providing structured guidance,
      institutional coordination, and parent engagement to ensure a seamless transition into higher
      education and professional career pathways.
    </p>
  </div>

  <!-- Services Grid -->
  <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    @for (service of services; track $index) {
      <div
        class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-2"
      >
        <!-- Image -->
        <img [src]="service.image" [alt]="service.title" class="w-full h-64 object-cover" />

        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
          <!-- Icon + Title -->
          <div class="flex items-center gap-3 mb-3">
            <!-- <div
              class="flex items-center justify-center w-10 h-10 rounded-full"
              [ngClass]="service.bgColor"
            >
              <span class="text-xl">{{ service.icon }}</span>
            </div> -->

            <h3 class="text-xl font-semibold text-gray-800">
              {{ service.title }}
            </h3>
          </div>

          <!-- Description -->
          <ul class="text-gray-600 flex-grow space-y-2">
            @for (
              desc of service.expanded ? service.description : service.description.slice(0, 4);
              track $index
            ) {
              <li class="flex items-start gap-2">
                <span class="text-black  text-xl">•</span>
                <span>{{ desc }}</span>
              </li>
            }
          </ul>

          <!-- Show More / Show Less -->
          @if (service.description.length > 4) {
            <button
              (click)="toggleService(service)"
              class="mt-3 text-sm font-semibold text-amber-600 hover:text-amber-800 transition"
            >
              {{ service.expanded ?  'Show Less' : 'Show More' }}
            </button>
          }
        </div>
      </div>
    }
  </div>
</section>
`
})
export class Services {
  services: Service[] = [
    {
      icon: '📝',
      title: 'Exams Support',
      bgColor: 'bg-green-100',
      description: [
        'study resources',
        'mock interviews',
        'career counseling guidance',
        'admission documentation help',
      ],
      image: 'assets/images/exsupport.jpg',
    },
    {
      icon: '🎓',
      title: 'Admissions',
      bgColor: 'bg-purple-100',
      expanded: false,
      description: [
        'Application submission support for selected colleges and universities.',
        'Application confirmation updates via Email or WhatsApp.',
        'Post-confirmation coordination including scheduled college visit for fee discussion.',
        'After visit confirmation, admission approval and admit card will be sent via Email.',
        'Complete assistance for education loan processing, if required.',
        'Post-admit card certificate verification and final admission formalities support.',
      ],

      image: 'assets/images/application.jpg',
    },
    {
      icon: '💰',
      title: 'Fee Negotiations',
      bgColor: 'bg-yellow-100',
      expanded: false,
      description: [
        'Strategic fee consultation and institutional coordination.',
        'Transparent and competitive fee structure guidance.',
        'Scholarship and concession support.',
        'Financial planning assistance for families.',
      ],
      image: 'assets/images/Negotiations.jpg',
    },
    {
      icon: '🏦',
      title: 'Loan Approvals',
      bgColor: 'bg-red-100',
      expanded: false,
      description: [
        'Professional education loan processing support.',
        'Bank coordination and documentation preparation.',
        'Eligibility assessment guidance.',
        'End-to-end assistance for timely loan approvals.',
      ],
      image: 'assets/images/loan.jpg',
    },
    {
      icon: '🤝',
      title: 'Guardian for Student',
      bgColor: 'bg-indigo-100',
      expanded: false,
      description: [
        'Dedicated communication between parents and institutions.',
        'Regular updates on academic progress and attendance.',
        'Student well-being monitoring.',
        'Transparent and collaborative academic journey support.',
      ],
      image: 'assets/images/Communication.jpg',
    },
    {
      icon: '🚐',
      title: 'Transportation',
      bgColor: 'bg-blue-100',
      expanded: false,
      description: [
        'Safe and coordinated transportation services.',
        'Travel support from hometowns to universities.',
        'Scheduled transfers during admissions and orientations.',
        'Strong focus on student safety and parental assurance.',
      ],
      image: 'assets/images/Transportation.jpg',
    },
  ];

  constructor(private route: Router) {}
  toggleService(service: any) {
    this.route.navigate(['/services-admissions']);
    service.expanded = !service.expanded;
  }
}

interface Service {
  icon: string;
  title: string;
  bgColor: string;
  description: string[]; // make it consistent
  image: string;
  expanded?: boolean; // optional property
}
