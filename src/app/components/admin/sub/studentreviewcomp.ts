import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { URLS } from '../../../urls/URLS';

export interface StudentReview {
  id: string | number;
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  feedback: string;
  visibleStatus: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-studentreview-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">Student Reviews</h1>
              <p class="text-sm text-slate-500 mt-1">Manage student feedback and reviews</p>
            </div>

            <!-- Search -->
            <div class="relative w-full sm:w-80">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"> 🔍 </span>
              <input
                type="text"
                [(ngModel)]="searchText"
                placeholder="Search students..."
                class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <!-- Total -->
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">Total Reviews</p>
                <h2 class="text-2xl font-bold text-slate-800 mt-1">
                  {{ DataList.length }}
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                💬
              </div>
            </div>
          </div>

          <!-- Visible -->
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">Visible Reviews</p>
                <h2 class="text-2xl font-bold text-green-600 mt-1">
                  {{ getVisibleCount() }}
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                ✓
              </div>
            </div>
          </div>

          <!-- Hidden -->
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">Hidden Reviews</p>
                <h2 class="text-2xl font-bold text-red-600 mt-1">
                  {{ getHiddenCount() }}
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                👁
              </div>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <!-- Table Header -->
          <div class="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold text-slate-800">Student Feedback</h2>
              <p class="text-xs text-slate-500 mt-1">{{ filteredData.length }} records found</p>
            </div>

            <button
              type="button"
              (click)="getData()"
              class="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition"
            >
              ↻ Refresh
            </button>
          </div>

          <!-- Responsive Table -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1200px]">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200">
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Student</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Gender</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">DOB</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Feedback</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Created</th>
                  <th class="px-5 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Action</th>
                </tr>
              </thead>

              <tbody>
                @for (item of filteredData; track item.id) {
                  <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <!-- Student -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                          {{ getInitials(item.fullName) }}
                        </div>
                        <div>
                          <p class="font-semibold text-slate-800">{{ item.fullName }}</p>
                          <p class="text-xs text-slate-400">ID: {{ item.id }}</p>
                        </div>
                      </div>
                    </td>

                    <!-- Contact -->
                    <td class="px-5 py-4">
                      <div>
                        <p class="text-sm font-medium text-slate-700">{{ item.phone }}</p>
                        <p class="text-xs text-slate-500 mt-1">{{ item.email }}</p>
                      </div>
                    </td>

                    <!-- Gender -->
                    <td class="px-5 py-4">
                      <span class="inline-flex px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                        {{ item.gender }}
                      </span>
                    </td>

                    <!-- DOB -->
                    <td class="px-5 py-4">
                      <span class="text-sm text-slate-600">{{ formatDate(item.dob) }}</span>
                    </td>

                    <!-- Feedback -->
                    <td class="px-5 py-4 max-w-[350px]">
                      <p class="text-sm text-slate-600 leading-6 line-clamp-2" [title]="item.feedback">
                        {{ cleanFeedback(item.feedback) }}
                      </p>
                    </td>

                    <!-- Status -->
                    <td class="px-5 py-4">
                      @if (item.visibleStatus) {
                        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                          <span class="w-2 h-2 rounded-full bg-green-500"></span>
                          Visible
                        </span>
                      } @else {
                        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                          <span class="w-2 h-2 rounded-full bg-red-500"></span>
                          Hidden
                        </span>
                      }
                    </td>

                    <!-- Created -->
                    <td class="px-5 py-4">
                      <span class="text-sm text-slate-600">{{ formatDateTime(item.createdAt) }}</span>
                    </td>

                    <!-- Actions -->
                    <td class="px-5 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <!-- Toggle Visibility -->
                        <button
                          type="button"
                          (click)="toggleVisibility(item)"
                          class="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                          [title]="item.visibleStatus ? 'Hide Review' : 'Show Review'"
                        >
                          👁
                        </button>

                        <!-- Delete -->
                        <button
                          type="button"
                          (click)="deleteReview(item)"
                          class="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                }

                @if (filteredData.length === 0) {
                  <tr>
                    <td colspan="8" class="px-5 py-16 text-center">
                      <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-4">
                          💬
                        </div>
                        <h3 class="font-semibold text-slate-700">No reviews found</h3>
                        <p class="text-sm text-slate-400 mt-1">Try changing your search.</p>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class StudentReviewComp implements OnInit {
  private apiUrl = `${URLS.backendapi}/student-reviews`;

  DataList: StudentReview[] = [];
  searchText = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http.get<StudentReview[]>(this.apiUrl).subscribe({
      next: (data: StudentReview[]) => {
        this.DataList = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.showError('Fetch Failed', 'Unable to load student reviews.');
      },
    });
  }

  get filteredData(): StudentReview[] {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.DataList;
    }

    return this.DataList.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(search) ||
        item.phone?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        item.gender?.toLowerCase().includes(search) ||
        item.feedback?.toLowerCase().includes(search),
    );
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name
      .split(' ')
      .filter((word: string) => word.length > 0)
      .slice(0, 2)
      .map((word: string) => word.charAt(0).toUpperCase())
      .join('');
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  formatDateTime(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  cleanFeedback(feedback: string): string {
    if (!feedback) return '-';
    return feedback.replace(/[“”]/g, '"').trim();
  }

  getVisibleCount(): number {
    return this.DataList.filter((item) => item.visibleStatus === true).length;
  }

  getHiddenCount(): number {
    return this.DataList.filter((item) => item.visibleStatus === false).length;
  }

  // =========================
  // TOGGLE VISIBILITY (FIXED)
  // =========================
  toggleVisibility(item: StudentReview): void {
    const previousStatus = item.visibleStatus;
    const newStatus = !previousStatus;

    // 1. Optimistic local update
    item.visibleStatus = newStatus;
    this.DataList = [...this.DataList]; // Trigger reference change for template bindings
    this.cdr.detectChanges();

    const updateData = {
      feedback: item.feedback,
      visibleStatus: newStatus,
    };

    // 2. HTTP Request
    this.http.put<StudentReview>(`${this.apiUrl}/${item.id}`, updateData).subscribe({
      next: (response: any) => {
        // Confirm backend state or apply response payload
        item.visibleStatus = response?.visibleStatus ?? newStatus;
        this.DataList = [...this.DataList];
        this.cdr.detectChanges();

        this.messageService.add({
          severity: 'success',
          summary: 'Status Updated',
          detail: `Review is now ${item.visibleStatus ? 'Visible' : 'Hidden'}.`,
          life: 2500,
        });
      },
      error: (error) => {
        console.error('Failed to update visibility:', error);

        // Revert to original status if the API call fails
        item.visibleStatus = previousStatus;
        this.DataList = [...this.DataList];
        this.cdr.detectChanges();

        this.showError('Update Failed', 'Unable to change review visibility status.');
      },
    });
  }

  deleteReview(item: StudentReview): void {
    if (!confirm(`Are you sure you want to delete ${item.fullName}'s review?`)) {
      return;
    }

    this.http.delete(`${this.apiUrl}/${item.id}`).subscribe({
      next: () => {
        this.DataList = this.DataList.filter((review) => review.id !== item.id);
        this.cdr.detectChanges();

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Review deleted successfully.',
          life: 3000,
        });
      },
      error: (error) => {
        console.error(error);
        this.showError('Delete Failed', 'Unable to delete the review.');
      },
    });
  }

  showError(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 3000,
    });
  }
}