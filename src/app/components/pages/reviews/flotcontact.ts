import { Component, computed, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { FormSubmissionService } from "../../../services/form-submission.service";
import { URLS } from "../../../urls/URLS";

@Component({
  selector: "app-floatcontact",
  template: `
      <p-toast />

      <button
      type="button"
      (click)="openModal()"
      class="fixed bottom-6 right-6 z-40 bg-emerald-600 bg-emerald-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2"
      aria-label="Open Application Form"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class=" whitespace-nowrap group-hover:max-w-xs  font-semibold text-sm">
        Apply / Contact
      </span>
    </button>

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
minlength="3"
maxlength="100"
pattern="^[A-Za-z ]+$"
/>
                  <!-- <input
                    type="text"
                    [(ngModel)]="formData.fullName"
                    name="fullName"
                    required
                    minlength="2"
                    maxlength="100"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Phone Number (10 digits) *</label>
                 <input
type="tel"
[(ngModel)]="formData.phoneNumber"
name="phoneNumber"
required
maxlength="10"
minlength="10"
pattern="[6-9][0-9]{9}"
/>
                  <!-- <input
                    type="tel"
                    maxlength="10"
                    pattern="[0-9]{10}"
                    [(ngModel)]="formData.phoneNumber"
                    name="phoneNumber"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input
type="email"
[(ngModel)]="formData.email"
name="email"
required
email
/>
                  <!-- <input
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    required
                    email
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
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
maxlength="50"
pattern="^[A-Za-z ]*$"
/>
                  <!-- <input
                    type="text"
                    [(ngModel)]="formData.state"
                    name="state"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">District</label>
<input
type="text"
[(ngModel)]="formData.district"
name="district"
maxlength="50"
pattern="^[A-Za-z ]*$"
/>
                  <!-- <input
                    type="text"
                    [(ngModel)]="formData.district"
                    name="district"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
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
                    required
                    minlength="2"
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
required
maxlength="100"
/>
                  <!-- <input
                    type="text"
                    [(ngModel)]="formData.stream"
                    name="stream"
                    required
                    minlength="2"
                    placeholder="e.g. Science, Commerce, Arts, CSE"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
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
                      required
                      minlength="2"
                      placeholder="e.g. M.Tech, MBBS, B.Ed"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                      
                    />
                  <!-- <input
                    type="text"
                    [(ngModel)]="formData.course"
                    name="course"
                    required
                    minlength="2"
                    placeholder="e.g. M.Tech, MBBS, B.Ed"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Specialization</label>
<input
  type="text"
                    [(ngModel)]="formData.specialization"
                    name="specialization"
                    required
                    minlength="2"
                    placeholder="e.g. Data Science, Finance"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
/>
                  <!-- <input
                    type="text"
                    [(ngModel)]="formData.specialization"
                    name="specialization"
                    required
                    minlength="2"
                    placeholder="e.g. Data Science, Finance"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  /> -->
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="pt-4 border-t flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-h-5">
                @if (submitSuccess()) {
                  <p class="text-sm text-emerald-700">{{ submitSuccess() }}</p>
                }
                @if (submitError()) {
                  <p class="text-sm text-red-600">{{ submitError() }}</p>
                }
              </div>
              <div class="flex justify-end gap-3">
                <button
                  type="button"
                  (click)="closeModal()"
                  class="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="!contactForm.form.valid || isSubmitting()"
                  class="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 rounded-xl transition shadow-md"
                >
                  {{ isSubmitting() ? "Submitting..." : "Submit Application" }}
                </button>
              </div>
            </div>
          </form>
        </div>
          </div>
    }
>`,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService]
})

export class floatcontact implements OnInit {
  // private readonly apiUrl = 'https://mbcareersolution.in/api/contact-forms';
  private apiUrl = `${URLS.backendapi}/contact-forms`;

  isModalOpen = signal(false);
  isSubmitting = signal(false);
  submitSuccess = signal<string | null>(null);
  submitError = signal<string | null>(null);

  constructor(
    private readonly formSubmissionService: FormSubmissionService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isModalOpen.set(true);
    }, 3000);
  }
  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  formData: StudentFormData = this.getInitialFormData();

  submitForm(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.submitError.set(null);
    this.submitSuccess.set(null);
    this.isSubmitting.set(true);

    this.formSubmissionService.submit(this.apiUrl, this.formData, 'Scholarship application').subscribe((result) => {
      this.isSubmitting.set(false);

      // Validate Full Name
      if (!this.formData.fullName.trim() || this.formData.fullName.trim().length < 3) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please enter a valid full name.'
        });
        return;
      }

      // Validate Phone Number
      if (!/^[6-9]\d{9}$/.test(this.formData.phoneNumber)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please enter a valid 10-digit mobile number.'
        });
        return;
      }

      // Validate Email
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(this.formData.email)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please enter a valid email address.'
        });
        return;
      }

      // Institution
      if (!this.formData.institutionName.trim()) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Institution name is required.'
        });
        return;
      }

      // Current Class
      if (!this.formData.currentClass) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please select your current class.'
        });
        return;
      }

      // Stream
      if (!this.formData.stream.trim()) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please enter your stream.'
        });
        return;
      }

      // Course
      if (!this.formData.course.trim()) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please enter the course.'
        });
        return;
      }

      // Specialization
      if (!this.formData.specialization.trim()) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation',
          detail: 'Please enter specialization.'
        });
        return;
      }

      // Percentage Validation
      const percentageRegex = /^(100(\.0{1,2})?|[0-9]{1,2}(\.[0-9]{1,2})?)$/;

      const marks = [
        this.formData.marks9th,
        this.formData.marks10th,
        this.formData.marks11th,
        this.formData.marks12th,
        this.formData.bachelorsPercentage
      ];

      for (const mark of marks) {
        if (mark && !percentageRegex.test(mark)) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Validation',
            detail: 'Marks should be between 0 and 100.'
          });
          return;
        }
      }

      // Year-wise percentages
      for (const mark of this.formData.bachelorsYearPercentages) {
        if (mark && !percentageRegex.test(mark)) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Validation',
            detail: 'Invalid Bachelor year percentage.'
          });
          return;
        }
      }

      if (result.success) {
        this.submitSuccess.set(result.message);
        console.log('Submitted Payload for Backend Entity:', this.formData);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: result.message,
          life: 4000,
        });
        this.formData = this.getInitialFormData();
        this.closeModal();
      } else {
        this.submitError.set(result.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Failed',
          detail: result.message,
          life: 5000,
        });
      }
    });
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
