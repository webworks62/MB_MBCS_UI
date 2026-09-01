import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { floatcontact } from '../reviews/flotcontact';

@Component({
  selector: 'app-courceBasedCollegeList',
  standalone: true,
  imports: [CommonModule, floatcontact],
  template: `
    <app-floatcontact />
    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Heading -->
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Our Partner Universities</h2>
          <p class="mt-3 text-gray-600">
            Explore top universities offering quality education and career opportunities.
          </p>
        </div>

        <!-- University Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          @for (item of collegesList; track item.id) {
            <div
              class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-5 flex flex-col items-center text-center cursor-pointer border border-gray-100"
            >
              <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center p-3">
                <img [src]="item.icon" [alt]="item.name" class="w-full h-full object-contain" />
              </div>

              <h3 class="mt-5 text-sm font-semibold text-gray-800 leading-5 capitalize">
                {{ item.name.replaceAll('-', ' ') }}
              </h3>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class CourceBasedCollegeList {
  collegesList = [
    {
      id: 1,
      name: 'suresh-gyan-vihar-university',
      icon: 'assets/universitylogo/suresh-gyan-vihar-University-1.png',
    },
    {
      id: 2,
      name: 'kishkinda-university',
      icon: 'assets/universitylogo/kishkinda-University.png',
    },
    {
      id: 3,
      name: 'sanskriti-university',
      icon: 'assets/universitylogo/sanskriti-University.webp',
    },
    {
      id: 4,
      name: 'sandip-university',
      icon: 'assets/universitylogo/Sandip-university.webp',
    },
    {
      id: 5,
      name: 'swarnim-startup-&-innovation-university',
      icon: 'assets/universitylogo/Swarnim-startup-&-innovation-university.png',
    },
    {
      id: 6,
      name: 'swami-narayana-university',
      icon: 'assets/universitylogo/Swami-Narayana-university.png',
    },

    {
      id: 7,
      name: 'Marwadi',
      icon: 'https://www.marwadiuniversity.ac.in/wp-content/themes/marwadi-university/assets/img/mu-logo.svg',
    },
    {
      id: 8,
      name: 'chettinad',
      icon: 'https://care.edu.in/wp-content/uploads/2019/07/logo.png',
    },
    {id:9,
      name:'ganpat',
      icon:'https://d2z4x7fn3a0wyp.cloudfront.net/institute/guni/02.png'
    },
     {id:10,
      name:'nims',
      icon:'https://nimsuniversity.org/nims.webp'
    },
    {id:11,
      name:'kalasalingam',
      icon:'https://www.kalasalingam.ac.in/wp-content/uploads/2022/02/Logo.png'
    },
    
  ];
}
