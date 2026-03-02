import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
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
