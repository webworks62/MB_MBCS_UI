import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admissions',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto max-w-6xl px-5 py-5">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (un of collegeList; track un.id) {
          <div
            class="overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <img [src]="un.image" [alt]="un.title" class="h-48 w-full object-cover" />
            <div class="p-4">
              <h2 class="mb-2 text-lg font-bold">{{ un.title | uppercase }}</h2>
              <p class="mb-4 text-sm text-gray-600">{{ un.description }}</p>
              <ul>
                <li class="text-sm text-gray-700 ">{{ un.features }}</li>
              </ul>
              <button
                class="w-full rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                (click)="viewDetails(un.id)"
              >
                View Details
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class Admissions {
  collegeList = [
    {
      id: 1,
      title: 'kishkinda',
      image: 'assets/images/kishkinda.jpg',
      description: 'Leading institution for quality education',
      features: [
        'Wide range of undergraduate & postgraduate courses',
        'Strong emphasis on academic excellence and research',
        'Modern campus with labs, library & sports facilities',
        'Active student clubs and cultural events',
      ],
    },
    {
      id: 2,
      title: 'sandip',
      image: 'assets/images/sandip.jpg',
      description: 'Excellence in academics and research',
      features: [
        'UGC-recognised private university with NAAC accreditation',
        'Courses in Engineering, Law, Design, Management, Pharmacy & Sciences',
        'Large 250 acre urban campus with modern labs',
        'Industry collaborations & placement support programs', // general from Sandip type
      ],
    },
    {
      id: 3,
      title: 'sanskriti',
      image: 'assets/images/sanskriti.jpg',
      description: 'Premier educational destination',
      features: [
        'UGC-recognised private university in Mathura with diverse schools',
        'Engineering, Agriculture, Tourism, Law, Pharmacy & more',
        'Centre of Excellence for Robotics & Automation',
        'Incubation centre and entrepreneurship support', // supported by official info
      ],
    },
    {
      id: 4,
      title: 'suresh gyan vihar',
      image: 'assets/images/suresh.jpg',
      description: 'Innovative learning environment',
      features: [
        'UGC-recognised private university in Jaipur with NAAC ‘A+’ Grade',
        'Programs across Engineering, Management, Pharmacy, Agriculture, Science, Law',
        'Strong campus placement network with top companies visiting',
        'Interdisciplinary PhD and research collaborations with national & international institutions',
      ],
    },
    {
      id: 5,
      title: 'swami narayana',
      image: 'assets/images/swami.jpg',
      description: 'Nurturing future leaders',
      features: [
        'Focus on holistic education and leadership skills',
        'Courses spanning arts, science, business and technology',
        'Student-centric learning environment with mentorship programs',
        'Industry tie-ups for practical exposure',
      ],
    },
    {
      id: 6,
      title: 'swarnim startup & innovation',
      image: 'assets/images/swarnim.jpg',
      description: 'Fostering entrepreneurship',
      features: [
        'Hub for innovation, startup & entrepreneurship education',
        'Programs in Engineering, Design, Science, Management & Paramedical sectors',
        'Startup incubation support & practical experiential learning',
        'Industry exposure with placement and real-world project opportunities',
      ],
    },
    {
      id: 7,
      title: 'chettinad',
      image: 'assets/images/chettinad.jpg',
      description: 'Dedicated to excellence',
      features: [
        'Chettinad Academy of Research & Education – deemed university in Chennai',
        'Wide academic offerings: Medicine, Nursing, Pharmacy, Architecture, Law & allied sciences',
        'Multidisciplinary research facilities in biotech, nanotech & genetics',
        'Modern campus with advanced labs and experienced faculty',
      ],
    },
  ];

  viewDetails(id: number) {
    console.log('View details for college id:', id);
  }
}
