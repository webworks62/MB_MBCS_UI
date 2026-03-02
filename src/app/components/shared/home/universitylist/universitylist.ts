import { Component } from '@angular/core';

@Component({
  selector: 'app-universitylist',
  imports: [],
  template: `<section class="bg-[#F5F5F5] py-5 overflow-hidden">
  <h2 class="text-3xl font-semibold text-center mb-12">
    University
  </h2>

  <!-- Carousel -->
  <div class="relative w-full overflow-hidden">

    <!-- Padding wrapper to prevent edge overlap -->
    <div class="px-16">
      <div class="flex w-max animate-marquee gap-10 items-center">

        <!-- First loop -->
        @for (skill of skills; track skill.id) {
          <div class="min-w-[260px] p-6 flex items-center justify-center">
            <!-- <img
              [src]="skill.icon"
              class="h-20 opacity-90 grayscale max-w-full"
              [alt]="skill.name"
            /> -->
             <img
              [src]="skill.icon"
              class="h-20 opacity-90  max-w-full"
              [alt]="skill.name"
            />
          </div>
        }

        <!-- Duplicate loop -->
        @for (skill of skills; track skill.id + '-dup') {
          <div class="min-w-[260px] p-6 flex items-center justify-center">
            <!-- <img
              [src]="skill.icon"
              class="h-20 opacity-90 grayscale max-w-full"
              [alt]="skill.name"
            /> -->
            <img
              [src]="skill.icon"
              class="h-20 opacity-90 max-w-full"
              [alt]="skill.name"
            />
          </div>
        }

      </div>
    </div>

  </div>
</section>

 `,
 styles:`/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Infinite marquee animation */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 65s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
`
})
export class Universitylist {
  skills = [
    {
      id: 1,
      name: 'suresh-gyan-vihar-University',
      icon: 'assets/universitylogo/suresh-gyan-vihar-University-1.png',
    },
    {
      id: 2,
      name: 'kishkinda-University',
      icon: 'assets/universitylogo/kishkinda-University.png',
    },
    {
      id: 3,
      name: 'sanskriti-University',
      icon: 'assets/universitylogo/sanskriti-University.webp',
    },
    {
      id: 4,
      name: 'Sandip-university',
      icon: 'assets/universitylogo/Sandip-university.webp',
    },
    {
      id: 5,
      name: 'Swarnim-startup-&-innovation-university',
      icon: 'assets/universitylogo/Swarnim-startup-&-innovation-university.png',
    },
    {
      id: 6,
      name: 'Swami-Narayana-university',
      icon: 'assets/universitylogo/Swami-Narayana-university.png',
    },
    // {
    //   id: 7,
    //   name: 'Central University of Hyderabad',
    //   icon: 'assets/universitylogo/cuh.svg',
    // },
  ];
}
