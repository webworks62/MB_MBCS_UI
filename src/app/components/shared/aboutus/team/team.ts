import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  borderColor: string;
  roleColor: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
template:`
<div
  #scrollContainer
  class="relative overflow-hidden py-10"
  (touchstart)="onTouchStart($event, scrollContainer)"
  (touchmove)="onTouchMove($event, scrollContainer)"
>

  <div
    class="flex gap-8"
    [ngClass]="{
      'animate-scroll-desktop': !isMobile,
      'animate-scroll-mobile': isMobile
    }"
  >

    @for (member of duplicatedTeam; track $index) {
      <div class="min-w-[250px] text-center p-6 transition">

        <img
          [src]="member.image"
          [alt]="member.name"
          class="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4"
          [ngClass]="member.borderColor"
        />

        <h3 class="text-lg font-semibold text-gray-800">
          {{ member.name }}
        </h3>

        <p class="font-medium mt-1" [ngClass]="member.roleColor">
          {{ member.role }}
        </p>

      </div>
    }

  </div>
</div>`,
styles:`
/* Desktop Speed */
.animate-scroll-desktop {
  animation: scrollDesktop 20s linear infinite;
}

/* Mobile Speed (Slower) */
.animate-scroll-mobile {
  animation: scrollMobile 35s linear infinite;
}

@keyframes scrollDesktop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollMobile {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}`
})
export class TeamComponent implements OnInit {

  isMobile = false;
  startX = 0;
  scrollLeft = 0;

  teamMembers: TeamMember[] = [
    {
      name: 'Mahesh',
      role: 'Guardian Support',
      image: 'assets/team/3dhuman.jpg',
      borderColor: 'border-amber-500',
      roleColor: 'text-amber-600',
    },
    {
      name: 'Balaji',
      role: 'Guardian Support',
      image: 'assets/team/3dhuman.jpg',
      borderColor: 'border-amber-500',
      roleColor: 'text-amber-600',
    },
    {
      name: 'Sai Adarsh',
      role: 'Admissions & Digital Team',
      image: 'assets/team/3dhuman.jpg',
      borderColor: 'border-purple-500',
      roleColor: 'text-purple-600',
    },
    {
      name: 'Arjun',
      role: 'Exam Support Specialist',
      image: 'assets/team/3dhuman.jpg',
      borderColor: 'border-green-500',
      roleColor: 'text-green-600',
    },
    {
      name: 'Travel Support Team',
      role: 'Student Travel Assistance',
      image: 'assets/team/3dhuman.jpg',
      borderColor: 'border-blue-500',
      roleColor: 'text-blue-600',
    },
  ];

  get duplicatedTeam() {
    return [...this.teamMembers, ...this.teamMembers];
  }

  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth < 768;
  }

  // Swipe Support
  onTouchStart(event: TouchEvent, container: HTMLElement) {
    this.startX = event.touches[0].pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
  }

  onTouchMove(event: TouchEvent, container: HTMLElement) {
    const x = event.touches[0].pageX - container.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    container.scrollLeft = this.scrollLeft - walk;
  }
}