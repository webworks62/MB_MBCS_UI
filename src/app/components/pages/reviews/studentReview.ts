import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-student-review",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <!-- Form Header -->
        <div class="bg-indigo-700 px-8 py-6 text-white">
          <h1 class="text-2xl font-bold tracking-tight">Student Review & Application Form</h1>
          <p class="text-indigo-100 text-sm mt-1">Please fill in all details accurately before submitting.</p>
        </div>

        <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="p-8 space-y-10">

          <!-- Section 1: Personal Information -->
          <section class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Personal Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  formControlName="fullName"
                  placeholder="John Doe"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('fullName')" class="text-xs text-red-500 mt-1">Full name is required.</div>
              </div>

              <!-- Date of Birth -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input 
                  type="date" 
                  formControlName="dob"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('dob')" class="text-xs text-red-500 mt-1">Date of birth is required.</div>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  formControlName="phone"
                  placeholder="10-digit phone number"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('phone')" class="text-xs text-red-500 mt-1">Enter a valid 10-digit number.</div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  formControlName="email"
                  placeholder="student@example.com"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('email')" class="text-xs text-red-500 mt-1">Enter a valid email address.</div>
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select 
                  formControlName="gender"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div *ngIf="isInvalid('gender')" class="text-xs text-red-500 mt-1">Please select gender.</div>
              </div>

              <!-- Aadhar Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
                <input 
                  type="text" 
                  formControlName="aadharNo"
                  placeholder="12-digit Aadhar number"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('aadharNo')" class="text-xs text-red-500 mt-1">Enter a valid 12-digit Aadhar number.</div>
              </div>

              <!-- Address (Full width) -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Residential Address *</label>
                <input 
                  type="text" 
                  formControlName="address"
                  placeholder="Street, City, State, Pincode"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('address')" class="text-xs text-red-500 mt-1">Address is required.</div>
              </div>
            </div>
          </section>

          <!-- Section 2: Academic Details -->
          <section class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Academic Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">10th Percentage / CGPA *</label>
                <input 
                  type="text" 
                  formControlName="tenthMarks"
                  placeholder="e.g. 88% or 9.2"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('tenthMarks')" class="text-xs text-red-500 mt-1">Required field.</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">12th Percentage *</label>
                <input 
                  type="text" 
                  formControlName="twelfthMarks"
                  placeholder="e.g. 85%"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('twelfthMarks')" class="text-xs text-red-500 mt-1">Required field.</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stream *</label>
                <select 
                  formControlName="stream"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition bg-white"
                >
                  <option value="">Select Stream</option>
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Science (PCB)">Science (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts/Humanities">Arts/Humanities</option>
                </select>
                <div *ngIf="isInvalid('stream')" class="text-xs text-red-500 mt-1">Please select a stream.</div>
              </div>
            </div>
          </section>

          <!-- Section 3: Course Interests -->
          <section class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Course Preferences
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Course *</label>
                <input 
                  type="text" 
                  formControlName="preferredCourse"
                  placeholder="e.g. B.Tech, B.Sc"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('preferredCourse')" class="text-xs text-red-500 mt-1">Required field.</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input 
                  type="text" 
                  formControlName="specialization"
                  placeholder="e.g. Computer Science"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                <input 
                  type="text" 
                  formControlName="preferredLocation"
                  placeholder="e.g. Delhi, Bangalore"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
              </div>
            </div>
          </section>

          <!-- Section 4: University Preferences -->
          <section class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              University Preferences
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">1st Preference University *</label>
                <input 
                  type="text" 
                  formControlName="universityPref1"
                  placeholder="University Name"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('universityPref1')" class="text-xs text-red-500 mt-1">First choice is required.</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">2nd Preference University</label>
                <input 
                  type="text" 
                  formControlName="universityPref2"
                  placeholder="University Name"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">3rd Preference University</label>
                <input 
                  type="text" 
                  formControlName="universityPref3"
                  placeholder="University Name"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
              </div>
            </div>
          </section>

          <!-- Section 5: Parent / Guardian Details -->
          <section class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Parent / Guardian Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Parent's Name *</label>
                <input 
                  type="text" 
                  formControlName="parentName"
                  placeholder="Parent / Guardian Name"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('parentName')" class="text-xs text-red-500 mt-1">Parent name is required.</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Parent's Contact Number *</label>
                <input 
                  type="tel" 
                  formControlName="parentContact"
                  placeholder="10-digit phone number"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('parentContact')" class="text-xs text-red-500 mt-1">Enter a valid 10-digit number.</div>
              </div>
            </div>
          </section>

          <!-- Section 6: Additional Information & Declaration -->
          <section class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Feedback & Confirmation
            </h2>

            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Feedback / Additional Comments</label>
                <textarea 
                  formControlName="feedback"
                  rows="3"
                  placeholder="Any additional information..."
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Digital Signature (Full Name) *</label>
                <input 
                  type="text" 
                  formControlName="signature"
                  placeholder="Type your full name as signature"
                  class="w-full rounded-lg border-gray-300 border px-3.5 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                />
                <div *ngIf="isInvalid('signature')" class="text-xs text-red-500 mt-1">Digital signature is required.</div>
              </div>
            </div>
          </section>

          <!-- Submit Button -->
          <div class="pt-6 border-t flex justify-end">
            <button 
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class StudentReview {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // Initialize form controls with validation logic
  // studentForm = this.fb.group({
  //   fullName: ['', Validators.required],
  //   dob: ['', Validators.required],
  //   phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  //   email: ['', [Validators.required, Validators.email]],
  //   gender: ['', Validators.required],
  //   address: ['', Validators.required],
  //   aadharNo: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
    
  //   tenthMarks: ['', Validators.required],
  //   twelfthMarks: ['', Validators.required],
  //   stream: ['', Validators.required],
    
  //   preferredCourse: ['', Validators.required],
  //   specialization: [''],
  //   preferredLocation: [''],
    
  //   universityPref1: ['', Validators.required],
  //   universityPref2: [''],
  //   universityPref3: [''],
    
  //   parentName: ['', Validators.required],
  //   parentContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    
  //   feedback: [''],
  //   signature: ['', Validators.required]
  // });

  // Helper method for field validation error display
  // isInvalid(controlName: string): boolean {
  //   const control = this.studentForm.get(controlName);
  //   return !!(control && control.invalid && (control.dirty || control.touched));
  // }

  // Handle submit and output form value as JSON object
// API Endpoint URL
  private apiUrl = 'https://api.mbcareersolutions.in/api/student-reviews';

  // Loading and State Flags
  isSubmitting = false;

  studentForm = this.fb.group({
    fullName: ['', Validators.required],
    dob: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    aadharNo: ['', Validators.required],
    
    tenthMarks: ['', Validators.required],
    twelfthMarks: ['', Validators.required],
    stream: ['', Validators.required],
    
    preferredCourse: ['', Validators.required],
    specialization: [''],
    preferredLocation: [''],
    
    universityPref1: ['', Validators.required],
    universityPref2: [''],
    universityPref3: [''],
    
    parentName: ['', Validators.required],
    parentContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    
    feedback: [''],
    signature: ['', Validators.required]
  });

  isInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // 3. Updated onSubmit method with HTTP POST call
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      alert('Please fill in all required fields properly.');
      return;
    }

    this.isSubmitting = true;

    // Send the form values directly matching your Java Entity fields
    this.http.post(this.apiUrl, this.studentForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        alert('Application submitted successfully!');
        this.studentForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Submission error:', error);
        if (error.status === 409) {
          alert('An application with this ID/Aadhar already exists.');
        } else {
          alert('Failed to submit application. Please try again later.');
        }
      }
    });
  }
}