import { Component, OnInit, signal, computed, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { URLS } from '../../../urls/URLS';

export interface ScholarshipApplication {
  id: string | number;
  fullName: string;
  phoneNumber: string;
  email: string;
  state: string;
  institutionName: string;
  currentClass: string;
  stream: string;
  marks9th: number | string;
  course: string;
  specialization: string;
  createdAt: string;
}

@Component({
  selector: 'app-scholarship-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- HEADER -->
        <div class="mb-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">
                Scholarship Applications
              </h1>
              <p class="text-sm text-slate-500 mt-1">
                Manage and review student scholarship applications
              </p>
            </div>

            <!-- SEARCH & EXPORT ACTIONS -->
            <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div class="relative w-full sm:w-80">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>
                <input
                  type="text"
                  [ngModel]="searchText()"
                  (ngModelChange)="searchText.set($event)"
                  placeholder="Search by name, phone, email, course..."
                  class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>

              <!-- EXPORT SELECTED BUTTON -->
              <button
                type="button"
                (click)="exportToExcel()"
                [disabled]="selectedIds().size === 0"
                class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium transition shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                📊 Export Selected ({{ selectedIds().size }})
              </button>
            </div>
          </div>
        </div>

        <!-- STATISTICS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">Total Applications</p>
                <h2 class="text-2xl font-bold text-slate-800 mt-1">
                  {{ dataList().length }}
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                🎓
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">Undergraduate</p>
                <h2 class="text-2xl font-bold text-blue-600 mt-1">
                  {{ undergraduateCount() }}
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                📚
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">B.Tech Applications</p>
                <h2 class="text-2xl font-bold text-purple-600 mt-1">
                  {{ btechCount() }}
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                💻
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-500">Average Marks</p>
                <h2 class="text-2xl font-bold text-green-600 mt-1">
                  {{ averageMarks() }}%
                </h2>
              </div>
              <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                📊
              </div>
            </div>
          </div>
        </div>

        <!-- TABLE -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <!-- TABLE HEADER -->
          <div class="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold text-slate-800">
                Scholarship Applications
              </h2>
              <p class="text-xs text-slate-500 mt-1">
                {{ filteredData().length }} applications found
              </p>
            </div>

            <!-- REFRESH -->
            <button
              type="button"
              (click)="getData()"
              [disabled]="isLoading()"
              class="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-sm font-medium transition flex items-center justify-center gap-2"
            >
              <span [class.animate-spin]="isLoading()">↻</span>
              {{ isLoading() ? 'Refreshing...' : 'Refresh' }}
            </button>
          </div>

          <!-- TABLE BODY -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1400px]">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200">
                  <th class="px-4 py-4 text-center w-12">
                    <input
                      type="checkbox"
                      [checked]="isAllSelected()"
                      (change)="toggleSelectAll()"
                      class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Student</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Institution</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Education</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Marks</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Course</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Specialization</th>
                  <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Applied On</th>
                  <th class="px-5 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Action</th>
                </tr>
              </thead>

              <tbody>
                @for (item of filteredData(); track item.id) {
                  <tr class="border-b border-slate-100 hover:bg-slate-50 transition" [class.bg-blue-50\/40]="isRowSelected(item.id)">
                    <!-- CHECKBOX -->
                    <td class="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        [checked]="isRowSelected(item.id)"
                        (change)="toggleRowSelection(item.id)"
                        class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                    </td>

                    <!-- STUDENT -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                          {{ getInitials(item.fullName) }}
                        </div>
                        <div>
                          <p class="font-semibold text-slate-800">{{ item.fullName }}</p>
                          <p class="text-xs text-slate-400 mt-1">{{ item.state }}</p>
                        </div>
                      </div>
                    </td>

                    <!-- CONTACT -->
                    <td class="px-5 py-4">
                      <p class="text-sm font-medium text-slate-700">{{ item.phoneNumber }}</p>
                      <p class="text-xs text-slate-500 mt-1">{{ item.email }}</p>
                    </td>

                    <!-- INSTITUTION -->
                    <td class="px-5 py-4">
                      <div>
                        <p class="text-sm font-medium text-slate-700">{{ item.institutionName }}</p>
                        <span class="inline-flex mt-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                          {{ item.state }}
                        </span>
                      </div>
                    </td>

                    <!-- EDUCATION -->
                    <td class="px-5 py-4">
                      <span class="inline-flex px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        {{ item.currentClass }}
                      </span>
                      <p class="text-xs text-slate-500 mt-2">{{ item.stream }}</p>
                    </td>

                    <!-- MARKS -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div class="h-full bg-green-500 rounded-full" [style.width.%]="getMarks(item.marks9th)"></div>
                        </div>
                        <span class="text-sm font-semibold text-slate-700">{{ item.marks9th }}%</span>
                      </div>
                    </td>

                    <!-- COURSE -->
                    <td class="px-5 py-4">
                      <span class="inline-flex px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">
                        {{ item.course }}
                      </span>
                    </td>

                    <!-- SPECIALIZATION -->
                    <td class="px-5 py-4">
                      <p class="text-sm text-slate-600 max-w-[180px]">{{ item.specialization }}</p>
                    </td>

                    <!-- CREATED -->
                    <td class="px-5 py-4">
                      <span class="text-sm text-slate-600">{{ formatDateTime(item.createdAt) }}</span>
                    </td>

                    <!-- ACTION -->
                    <td class="px-5 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <!-- <button
                          type="button"
                          (click)="editApplication(item)"
                          class="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                          title="Edit"
                        >
                          ✏️
                        </button> -->
                        <button
                          type="button"
                          (click)="deleteApplication(item)"
                          class="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                }

                @if (filteredData().length === 0) {
                  <tr>
                    <td colspan="10" class="px-5 py-16 text-center">
                      <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-4">
                          🎓
                        </div>
                        <h3 class="font-semibold text-slate-700">No applications found</h3>
                        <p class="text-sm text-slate-400 mt-1">Try changing your search query.</p>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ScholarshipComp implements OnInit {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private apiUrl = `${URLS.backendapi}/contact-forms`;

  // Reactive State Signals
  dataList = signal<ScholarshipApplication[]>([]);
  searchText = signal<string>('');
  selectedIds = signal<Set<string | number>>(new Set());
  isLoading = signal<boolean>(false);

  // Computed Signals for automatic derivation & performance optimization
  filteredData = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const data = this.dataList();

    if (!search) return data;

    return data.filter((item:any) =>
      [
        item.fullName,
        item.phoneNumber,
        item.email,
        item.state,
        item.institutionName,
        item.currentClass,
        item.stream,
        item.course,
        item.specialization,
      ].some((val) => val?.toLowerCase().includes(search))
    );
  });

  undergraduateCount = computed(() => {
    return this.dataList().filter((item:any) =>
      item.currentClass?.toLowerCase().includes('undergraduate')
    ).length;
  });

  btechCount = computed(() => {
    return this.dataList().filter(
      (item:any) => item.course?.trim().toLowerCase() === 'b tech'
    ).length;
  });

  averageMarks = computed(() => {
    const data = this.dataList();
    if (!data.length) return '0';

    const validMarks = data
      .map((item:any) => Number(item.marks9th))
      .filter((mark:any) => !isNaN(mark));

    if (!validMarks.length) return '0';

    const total = validMarks.reduce((sum:any, mark:any) => sum + mark, 0);
    return (total / validMarks.length).toFixed(1);
  });

  isAllSelected = computed(() => {
    const filtered = this.filteredData();
    const selected = this.selectedIds();
    return filtered.length > 0 && filtered.every((item:any) => selected.has(item.id));
  });

  ngOnInit(): void {
    this.getData();
  }

  // ============================
  // DATA FETCHING & REFRESH
  // ============================
  getData(): void {
    this.isLoading.set(true);

    this.http.get<ScholarshipApplication[]>(this.apiUrl).subscribe({
      next: (data:any) => {
        this.dataList.set(Array.isArray(data) ? data : []);
        this.isLoading.set(false);
      },
      error: (error:any) => {
        console.error(error);
        this.isLoading.set(false);
        this.showError('Fetch Failed', 'Unable to load scholarship applications.');
      },
    });
  }

  // ============================
  // ROW SELECTION HANDLERS
  // ============================
  isRowSelected(id: string | number): boolean {
    return this.selectedIds().has(id);
  }

  toggleRowSelection(id: string | number): void {
    const updated = new Set(this.selectedIds());
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    this.selectedIds.set(updated);
  }

  toggleSelectAll(): void {
    const currentSelected = new Set(this.selectedIds());
    const visibleRows = this.filteredData();

    if (this.isAllSelected()) {
      visibleRows.forEach((row:any) => currentSelected.delete(row.id));
    } else {
      visibleRows.forEach((row:any) => currentSelected.add(row.id));
    }

    this.selectedIds.set(currentSelected);
  }

  // ============================
  // EXCEL EXPORT
  // ============================
  exportToExcel(): void {
    const selectedSet = this.selectedIds();
    const recordsToExport = this.dataList().filter((item:any) => selectedSet.has(item.id));

    if (recordsToExport.length === 0) {
      this.showError('Export Failed', 'Please select at least one row to export.');
      return;
    }

    const formattedData = recordsToExport.map((item:any) => ({
      'Full Name': item.fullName,
      'Phone Number': item.phoneNumber,
      Email: item.email,
      State: item.state,
      Institution: item.institutionName,
      'Current Class': item.currentClass,
      Stream: item.stream,
      'Marks (%)': item.marks9th,
      Course: item.course,
      Specialization: item.specialization,
      'Applied Date': this.formatDateTime(item.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Scholarships');

    XLSX.writeFile(workbook, `Scholarship_Applications_${Date.now()}.xlsx`);

    this.messageService.add({
      severity: 'success',
      summary: 'Export Successful',
      detail: `Exported ${recordsToExport.length} application(s) to Excel.`,
      life: 3000,
    });
  }

  // ============================
  // HELPERS & ACTIONS
  // ============================
  getInitials(name: string): string {
    if (!name) return '?';
    return name
      .trim()
      .split(' ')
      .filter((word) => word.length > 0)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
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

  getMarks(value: any): number {
    const marks = Number(value);
    if (isNaN(marks)) return 0;
    return Math.min(Math.max(marks, 0), 100);
  }

  editApplication(item: ScholarshipApplication): void {
    console.log('Edit scholarship application:', item);
  }

  deleteApplication(item: ScholarshipApplication): void {
    const confirmed = confirm(
      `Are you sure you want to delete the scholarship application of ${item.fullName}?`
    );

    if (!confirmed) return;

    this.http.delete(`${this.apiUrl}/${item.id}`).subscribe({
      next: () => {
        this.dataList.update((list) => list.filter((app) => app.id !== item.id));

        // Remove from selected Set if present
        if (this.selectedIds().has(item.id)) {
          const updatedSelected = new Set(this.selectedIds());
          updatedSelected.delete(item.id);
          this.selectedIds.set(updatedSelected);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Scholarship application deleted successfully.',
          life: 3000,
        });
      },
      error: (error) => {
        console.error(error);
        this.showError('Delete Failed', 'Unable to delete scholarship application.');
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