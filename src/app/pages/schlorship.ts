import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { floatcontact } from "../components/pages/contactus/flotcontact";

export interface ScholarshipItem {
    title: string;
    category: string;
    type: 'Government' | 'Private';
    featured?: boolean;
    note?: string;
}

export interface StudentFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    district: string;
    state: string;
    familyIncome: string;
    institutionName: string;
    currentClass: string;
    stream: string;
    marks9th: string;
    marks10th: string;
    marks11th: string;
    marks12th: string;
    bachelorsDegree: string;
    bachelorsPercentage: string;
    bachelorsYearPercentages: string[];
    course: string;
    specialization: string;
}

@Component({
    selector: 'app-scholarship',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <!-- Floating Contact Form Trigger Button -->
    <button
      type="button"
      (click)="openModal()"
      class="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
      aria-label="Open Application Form"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-semibold text-sm">
        Apply / Contact
      </span>
    </button>

    <!-- Modal Backdrop & Form Container -->
    @if (isModalOpen()) {

          <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Header -->
          <div class="bg-emerald-700 text-white px-6 py-4 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold">Student Scholarship Form</h2>
              <p class="text-xs text-emerald-100 mt-0.5">Fill in your details for scholarship eligibility</p>
            </div>
            <button
              (click)="closeModal()"
              class="text-white/80 hover:text-white bg-emerald-800/50 hover:bg-emerald-800 rounded-lg p-1.5 transition-colors"
            >
              ✕
            </button>
          </div>

          <!-- Form Content -->
          <form (ngSubmit)="submitForm()" #contactForm="ngForm" class="p-6 overflow-y-auto space-y-6 text-gray-800">
            
            <!-- Personal Information -->
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-emerald-800 mb-3 border-b pb-1">
                Personal Information
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.fullName"
                    name="fullName"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Phone Number (10 digits) *</label>
                  <input
                    type="tel"
                    maxlength="10"
                    [(ngModel)]="formData.phoneNumber"
                    name="phoneNumber"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Annual Family Income</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.familyIncome"
                    name="familyIncome"
                    placeholder="e.g. ₹2,50,000"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.state"
                    name="state"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.district"
                    name="district"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Institution & Class Selection -->
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-emerald-800 mb-3 border-b pb-1">
                Institution & Academic Status
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Institution Name</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.institutionName"
                    name="institutionName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Current Class / Standard *</label>
                  <select
                    [(ngModel)]="formData.currentClass"
                    name="currentClass"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
                  >
                    <option value="" disabled>Select Class</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Diploma / ITI">Diploma / ITI</option>
                    <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                    <option value="Postgraduate">Postgraduate (Master's)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Stream / Field</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.stream"
                    name="stream"
                    placeholder="e.g. Science, Commerce, Arts, CSE"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Academic Details (Dynamic Based on Class Selection) -->
            @if (formData.currentClass) {
              <div>
                <h3 class="text-sm font-semibold uppercase tracking-wider text-emerald-800 mb-3 border-b pb-1">
                  Academic Marks & Performance
                </h3>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <!-- 9th Marks -->
                  @if (showMarks9th()) {
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Class 9th Marks (%)</label>
                      <input
                        type="text"
                        [(ngModel)]="formData.marks9th"
                        name="marks9th"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  }

                  <!-- 10th Marks -->
                  @if (showMarks10th()) {
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Class 10th Marks (%)</label>
                      <input
                        type="text"
                        [(ngModel)]="formData.marks10th"
                        name="marks10th"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  }

                  <!-- 11th Marks -->
                  @if (showMarks11th()) {
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Class 11th Marks (%)</label>
                      <input
                        type="text"
                        [(ngModel)]="formData.marks11th"
                        name="marks11th"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  }

                  <!-- 12th Marks -->
                  @if (showMarks12th()) {
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Class 12th Marks (%)</label>
                      <input
                        type="text"
                        [(ngModel)]="formData.marks12th"
                        name="marks12th"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  }

                  <!-- Bachelor's Degree Details -->
                  @if (showBachelorsFields()) {
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Bachelor's Degree Name</label>
                      <input
                        type="text"
                        [(ngModel)]="formData.bachelorsDegree"
                        name="bachelorsDegree"
                        placeholder="e.g. B.Tech, B.Sc, B.Com"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Overall Bachelor's Percentage / CGPA</label>
                      <input
                        type="text"
                        [(ngModel)]="formData.bachelorsPercentage"
                        name="bachelorsPercentage"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  }
                </div>

                <!-- Bachelor's Year-wise Percentages Dynamic List -->
                @if (showBachelorsYearWise()) {
                  <div class="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div class="flex items-center justify-between mb-2">
                      <label class="text-xs font-bold text-gray-700">Bachelor's Year-wise Percentage Breakdown</label>
                      <button
                        type="button"
                        (click)="addBachelorsYear()"
                        class="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold px-2.5 py-1 rounded transition"
                      >
                        + Add Year
                      </button>
                    </div>

                    @for (year of formData.bachelorsYearPercentages; track $index) {
                      <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs text-gray-500 w-16">Year {{ $index + 1 }}:</span>
                        <input
                          type="text"
                          [(ngModel)]="formData.bachelorsYearPercentages[$index]"
                          [name]="'yearPercentage_' + $index"
                          placeholder="e.g. 75%"
                          class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-white"
                        />
                        <button
                          type="button"
                          (click)="removeBachelorsYear($index)"
                          class="text-xs text-red-600 hover:text-red-800 px-2 py-1 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    } @empty {
                      <p class="text-xs text-gray-400 italic">Click "+ Add Year" to record year-wise percentages.</p>
                    }
                  </div>
                }
              </div>
            }

            <!-- Target Course Details -->
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-emerald-800 mb-3 border-b pb-1">
                Course Applying For
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Target Course</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.course"
                    name="course"
                    placeholder="e.g. M.Tech, MBBS, B.Ed"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.specialization"
                    name="specialization"
                    placeholder="e.g. Data Science, Finance"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="pt-4 border-t flex justify-end gap-3">
              <button
                type="button"
                (click)="closeModal()"
                class="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="!contactForm.form.valid"
                class="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 rounded-xl transition shadow-md"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
          </div>
    }

    <!-- Header & Main Directory Content -->
    <header class="bg-linear-to-r from-emerald-800 via-green-700 to-teal-600 text-white py-12 shadow-md">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
         SCHOLARSHIPS
        </h1>
        <p class="mt-3 text-lg font-medium text-emerald-100">
          Comprehensive Directory for Government & Private Scholarships
        </p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="relative mb-10 max-w-2xl">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          [(ngModel)]="searchQuery"
          placeholder="Search by scholarship name, category, or note..."
          class="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 placeholder-gray-400 outline-none transition"
        />
        @if (searchQuery) {
          <button
            type="button"
            (click)="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        }
      </div>

      <div class="space-y-12">
        @for (category of categories(); track category) {
          @if (getFilteredForCategory(category).length > 0) {
            <section class="space-y-6">
              <div class="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div class="w-2 h-7 bg-emerald-600 rounded-full"></div>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
                  {{ category }}
                </h2>
              </div>

              <div class="grid lg:grid-cols-2 gap-6">
                <!-- Government Scholarships -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-lg font-bold text-blue-800 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                        Government Scholarships
                      </h3>
                      <span class="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {{ getFilter(category, 'Government').length }} Available
                      </span>
                    </div>

                    <ul class="divide-y divide-gray-100">
                      @for (item of getFilter(category, 'Government'); track item.title) {
                        <li class="py-3.5 flex items-start justify-between group">
                          <div class="flex items-start gap-3">
                            <span class="text-emerald-600 font-semibold mt-0.5">✓</span>
                            <span class="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors">
                              {{ item.title }}
                            </span>
                          </div>
                          @if (item.note) {
                            <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                              {{ item.note }}
                            </span>
                          }
                        </li>
                      } @empty {
                        <li class="py-4 text-sm text-gray-400 italic">No government scholarships match search criteria.</li>
                      }
                    </ul>
                  </div>
                </div>

                <!-- Private Scholarships -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-lg font-bold text-purple-800 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 bg-purple-600 rounded-full"></span>
                        Private Scholarships
                      </h3>
                      <span class="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
                        {{ getFilter(category, 'Private').length }} Available
                      </span>
                    </div>

                    <ul class="divide-y divide-gray-100">
                      @for (item of getFilter(category, 'Private'); track item.title) {
                        <li class="py-3.5 flex items-start justify-between group">
                          <div class="flex items-start gap-3">
                            <span class="text-emerald-600 font-semibold mt-0.5">✓</span>
                            <span class="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors">
                              {{ item.title }}
                            </span>
                          </div>
                          @if (item.note) {
                            <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                              {{ item.note }}
                            </span>
                          }
                        </li>
                      } @empty {
                        <li class="py-4 text-sm text-gray-400 italic">No private scholarships match search criteria.</li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          }
        } @empty {
          <div class="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <p class="text-gray-500 font-medium">No scholarship categories found.</p>
          </div>
        }
      </div>

      <!-- Featured Section -->
      @if (featured().length > 0) {
        <section class="mt-14 bg-linear-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl shadow-sm p-6 md:p-8">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-2xl">⭐</span>
            <h2 class="text-2xl font-bold text-amber-900">
              Top Priority Scholarships
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (item of featured(); track item.title) {
              <div class="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div class="flex items-start justify-between gap-2">
                  <h4 class="font-semibold text-gray-800 text-sm md:text-base">{{ item.title }}</h4>
                  <span class="text-amber-500">★</span>
                </div>
                <div class="mt-3 flex items-center justify-between text-xs">
                  <span class="font-medium text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    {{ item.category }}
                  </span>
                  <span class="text-gray-500 font-medium">{{ item.type }}</span>
                </div>
              </div>
            }
          </div>
        </section>
      }
    </div>
  `
})
export class Scholarship {
    searchQuery = '';
    isModalOpen = signal(false);


    readonly scholarships = signal<ScholarshipItem[]>([
        { title: 'National Means-cum-Merit Scholarship (NMMS)', category: 'Class 10', type: 'Government', featured: true },
        { title: 'Pre-Matric Scholarship for SC Students', category: 'Class 10', type: 'Government' },
        { title: 'Pre-Matric Scholarship for ST Students', category: 'Class 10', type: 'Government' },
        { title: 'Pre-Matric Scholarship for Minority Students', category: 'Class 10', type: 'Government' },
        { title: 'PM YASASVI', category: 'Class 10', type: 'Government', note: 'Eligible categories' },
        { title: 'State Pre-Matric Scholarships', category: 'Class 10', type: 'Government', note: 'Varies by state' },
        { title: 'Buddy4Study Scholarship Programs', category: 'Class 10', type: 'Private', featured: true },
        { title: 'LIC Golden Jubilee Scholarship', category: 'Class 10', type: 'Private' },
        { title: 'Sitaram Jindal Foundation Scholarship', category: 'Class 10', type: 'Private' },
        { title: 'Kotak Junior Scholarship', category: 'Class 10', type: 'Private' },
        { title: 'HDFC Bank Parivartan Scholarship', category: 'Class 10', type: 'Private' },
        { title: 'Central Sector Scheme of Scholarship (CSSS)', category: 'Class 11 & 12', type: 'Government', featured: true },
        { title: 'INSPIRE SHE Scholarship', category: 'Class 11 & 12', type: 'Government', note: 'Science students' },
        { title: 'PM YASASVI Scholarship', category: 'Class 11 & 12', type: 'Government' },
        { title: 'National Scholarship for Persons with Disabilities', category: 'Class 11 & 12', type: 'Government' },
        { title: 'State Merit Scholarships', category: 'Class 11 & 12', type: 'Government' },
        { title: 'Reliance Foundation Undergraduate Scholarship', category: 'Class 11 & 12', type: 'Private', featured: true },
        { title: 'HDFC Bank Parivartan ECS Scholarship', category: 'Class 11 & 12', type: 'Private' },
        { title: 'Kotak Kanya Scholarship', category: 'Class 11 & 12', type: 'Private' },
        { title: 'Aditya Birla Scholarship', category: 'Class 11 & 12', type: 'Private' },
        { title: 'Santoor Women\'s Scholarship', category: 'Class 11 & 12', type: 'Private' },
        { title: 'Azim Premji Scholarship', category: 'Class 11 & 12', type: 'Private', note: 'Eligible girl students' },
        { title: 'AICTE Pragati Scholarship', category: 'Diploma / ITI', type: 'Government', featured: true, note: 'Girls' },
        { title: 'AICTE Saksham Scholarship', category: 'Diploma / ITI', type: 'Government', note: 'PwD' },
        { title: 'Post-Matric Scholarships', category: 'Diploma / ITI', type: 'Government', note: 'SC/ST/OBC/Minority' },
        { title: 'State Technical Education Scholarships', category: 'Diploma / ITI', type: 'Government' },
        { title: 'Foundation for Excellence (FFE)', category: 'Diploma / ITI', type: 'Private' },
        { title: 'Sitaram Jindal Foundation', category: 'Diploma / ITI', type: 'Private' },
        { title: 'Tata Capital Pankh Scholarship', category: 'Diploma / ITI', type: 'Private' },
        { title: 'Central Sector Scholarship (CSSS)', category: 'Undergraduate', type: 'Government', featured: true },
        { title: 'AICTE Pragati', category: 'Undergraduate', type: 'Government' },
        { title: 'AICTE Saksham', category: 'Undergraduate', type: 'Government' },
        { title: 'AICTE Swanath Scholarship', category: 'Undergraduate', type: 'Government' },
        { title: 'Post-Matric Scholarships', category: 'Undergraduate', type: 'Government', note: 'SC/ST/OBC/EWS/Minority' },
        { title: 'Top Class Education Scheme', category: 'Undergraduate', type: 'Government' },
        { title: 'Ishan Uday', category: 'Undergraduate', type: 'Government', note: 'North-East' },
        { title: 'PM Scholarship Scheme', category: 'Undergraduate', type: 'Government', note: 'Defence Wards' },
        { title: 'SBI Asha Scholarship', category: 'Undergraduate', type: 'Private', featured: true },
        { title: 'Reliance Foundation Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'HDFC Bank Parivartan Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'Kotak Shiksha Nidhi', category: 'Undergraduate', type: 'Private' },
        { title: 'Aditya Birla Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'Foundation for Excellence (FFE)', category: 'Undergraduate', type: 'Private' },
        { title: 'Sitaram Jindal Foundation Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'Tata Capital Pankh Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'ONGC Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'Indian Oil (IOCL) Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'Siemens Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'L&T Build India Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'IET India Scholarship Award', category: 'Undergraduate', type: 'Private' },
        { title: 'GRT Mahalakshmi Scholarship', category: 'Undergraduate', type: 'Private' },
        { title: 'Bharti Airtel Scholarship', category: 'Undergraduate', type: 'Private', note: 'Eligible institutions only' },
        { title: 'AICTE PG (GATE/GPAT) Scholarship', category: 'Postgraduate', type: 'Government', featured: true },
        { title: 'UGC PG Scholarships', category: 'Postgraduate', type: 'Government' },
        { title: 'National Fellowship Schemes', category: 'Postgraduate', type: 'Government' },
        { title: 'Post-Matric Scholarships', category: 'Postgraduate', type: 'Government' },
        { title: 'State PG Scholarships', category: 'Postgraduate', type: 'Government' },
        { title: 'SBI Asha Scholarship', category: 'Postgraduate', type: 'Private', note: 'PG category', featured: true },
        { title: 'Reliance Foundation Scholarship', category: 'Postgraduate', type: 'Private' },
        { title: 'HDFC Bank Parivartan Scholarship', category: 'Postgraduate', type: 'Private' },
        { title: 'Kotak Shiksha Nidhi', category: 'Postgraduate', type: 'Private' },
        { title: 'KC Mahindra Scholarship', category: 'Postgraduate', type: 'Private' },
        { title: 'Aditya Birla Scholarship', category: 'Postgraduate', type: 'Private' },
        { title: 'JN Tata Endowment', category: 'Postgraduate', type: 'Private' },
        { title: 'Sitaram Jindal Foundation Scholarship', category: 'Postgraduate', type: 'Private' }
    ]);

    readonly categories = computed(() => {
        return [...new Set(this.scholarships().map((item) => item.category))].sort();
    });

    readonly featured = computed(() => {
        const query = this.searchQuery.toLowerCase().trim();
        return this.scholarships().filter((item) => {
            if (item.featured !== true) return false;
            if (!query) return true;
            return item.title.toLowerCase().includes(query) || item.note?.toLowerCase().includes(query);
        });
    });


    openModal(): void {
        this.isModalOpen.set(true);
    }

    closeModal(): void {
        this.isModalOpen.set(false);
    }





    getFilter(category: string, type: 'Government' | 'Private'): ScholarshipItem[] {
        const query = this.searchQuery.toLowerCase().trim();
        return this.scholarships().filter((item) => {
            const matchesQuery = !query || item.title.toLowerCase().includes(query) || item.note?.toLowerCase().includes(query);
            return item.category === category && item.type === type && matchesQuery;
        });
    }

    getFilteredForCategory(category: string): ScholarshipItem[] {
        const query = this.searchQuery.toLowerCase().trim();
        return this.scholarships().filter((item) => {
            const matchesQuery = !query || item.title.toLowerCase().includes(query) || item.note?.toLowerCase().includes(query);
            return item.category === category && matchesQuery;
        });
    }

      formData: StudentFormData = this.getInitialFormData();

    submitForm(): void {
        console.log('Submitted Payload for Backend Entity:', this.formData);
        alert('Application submitted successfully!');
        this.formData = this.getInitialFormData();
        // this.closeModal();
    }

    // Dynamic Form Field Visibility Controls
    showMarks9th = computed(() => {
        const c = this.formData.currentClass;
        return c === 'Class 10' || c === 'Class 11';
    });

    showMarks10th = computed(() => {
        const c = this.formData.currentClass;
        return c === 'Class 11' || c === 'Class 12' || c === 'Diploma / ITI' || c === 'Undergraduate' || c === 'Postgraduate';
    });

    showMarks11th = computed(() => {
        const c = this.formData.currentClass;
        return c === 'Class 12';
    });

    showMarks12th = computed(() => {
        const c = this.formData.currentClass;
        return c === 'Undergraduate' || c === 'Postgraduate';
    });

    showBachelorsFields = computed(() => {
        const c = this.formData.currentClass;
        return c === 'Postgraduate' || c === 'Undergraduate';
    });

    showBachelorsYearWise = computed(() => {
        const c = this.formData.currentClass;
        return c === 'Postgraduate' || c === 'Undergraduate';
    });

    addBachelorsYear(): void {
        this.formData.bachelorsYearPercentages.push('');
    }

    removeBachelorsYear(index: number): void {
        this.formData.bachelorsYearPercentages.splice(index, 1);
    }

    private getInitialFormData(): StudentFormData {
        return {
            fullName: '',
            phoneNumber: '',
            email: '',
            familyIncome: '',
            state: '',
            district: '',
            institutionName: '',
            currentClass: '',
            stream: '',
            marks9th: '',
            marks10th: '',
            marks11th: '',
            marks12th: '',
            bachelorsDegree: '',
            bachelorsPercentage: '',
            bachelorsYearPercentages: [] as string[],
            course: '',
            specialization: ''
        };
    }


}