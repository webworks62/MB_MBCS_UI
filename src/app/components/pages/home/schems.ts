import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-schems',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <header class="bg-gradient-to-r from-green-700 to-emerald-500 text-white py-10">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-5xl font-bold">
          10TH TO PG SCHOLARSHIPS
        </h1>

        <p class="mt-3">
          Government & Private Scholarships
        </p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto p-6">

      <input
        [(ngModel)]="search"
        placeholder="Search Scholarship..."
        class="w-full p-3 rounded-lg border mb-8"
      />

      <div *ngFor="let category of categories">

        <h2 class="text-3xl font-bold text-green-700 mb-5">
          {{ category }}
        </h2>

        <div class="grid lg:grid-cols-2 gap-6">

          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="text-xl font-bold text-blue-700 mb-3">
              Government Scholarships
            </h3>

            <ul>
              <li
                *ngFor="let item of filter(category, 'Government')"
                class="py-2 border-b"
              >
                ✅ {{ item.title }}
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="text-xl font-bold text-purple-700 mb-3">
              Private Scholarships
            </h3>

            <ul>
              <li
                *ngFor="let item of filter(category, 'Private')"
                class="py-2 border-b"
              >
                ✅ {{ item.title }}
              </li>
            </ul>
          </div>

        </div>
      </div>

      <section class="mt-10 bg-yellow-50 rounded-xl shadow p-6">

        <h2 class="text-3xl font-bold mb-5">
          ⭐ Top Priority Scholarships
        </h2>

        <ul>
          <li
            *ngFor="let item of featured"
            class="py-2 border-b"
          >
            ⭐ {{ item.title }}
          </li>
        </ul>

      </section>

    </div>
  `
})
export class Schems {

    search = '';

    scholarships: Scholarship[] = [
        {
            title: 'National Means-cum-Merit Scholarship (NMMS)',
            category: 'Class 10',
            type: 'Government',
            featured: true
        },
        {
            title: 'Pre-Matric Scholarship for SC Students',
            category: 'Class 10',
            type: 'Government'
        },
        {
            title: 'Buddy4Study Scholarship Programs',
            category: 'Class 10',
            type: 'Private'
        },
        {
            title: 'Central Sector Scheme of Scholarship (CSSS)',
            category: 'Class 11 & 12',
            type: 'Government',
            featured: true
        },
        {
            title: 'Reliance Foundation Undergraduate Scholarship',
            category: 'Class 11 & 12',
            type: 'Private',
            featured: true
        }
    ];

    get categories(): string[] {
        return [...new Set(this.scholarships.map(s => s.category))];
    }

    filter(category: string, type: 'Government' | 'Private'): Scholarship[] {
        return this.scholarships.filter(s =>
            s.category === category &&
            s.type === type &&
            s.title.toLowerCase().includes(this.search.toLowerCase())
        );
    }

    get featured(): Scholarship[] {
        return this.scholarships.filter(s =>
            s.featured &&
            s.title.toLowerCase().includes(this.search.toLowerCase())
        );
    }
}

export interface Scholarship {
    title: string;
    category: string;
    type: 'Government' | 'Private';
    featured?: boolean;
}