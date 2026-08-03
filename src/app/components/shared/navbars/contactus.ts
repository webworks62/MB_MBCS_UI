import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ContcatusService } from '../../../serviceslayer/contactus.services';
import { FormSubmissionService } from '../../../serviceslayer/form-submission.service';
import { CommonModule } from '@angular/common';
import { URLS } from '../../../urls/URLS';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
template:`<section
  class="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-12"
  style="background-image: url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')"
>
  <!-- FORM CARD -->
  <div class="max-w-5xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
    <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center">Contact Us</h2>

    <!-- SUCCESS MESSAGE -->
    <div
      *ngIf="successMessage"
      class="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center font-medium"
    >
      {{ successMessage }}
    </div>

    <form
      [formGroup]="contactForm"
      (ngSubmit)="submit()"
      class="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <!-- FULL NAME -->
      <div class="flex flex-col">
        <label class="mb-1 font-medium text-sm">Full Name</label>
        <input
          type="text"
          formControlName="fullName"
          class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full name"
        />
        @if (contactForm.get('fullName')?.invalid && submitted) {
          <p class="text-red-500 text-xs mt-1">
            @if (contactForm.get('fullName')?.errors?.['required']) {
              <span> Full name is required </span>
            }
            @if (contactForm.get('fullName')?.errors?.['minlength']) {
              <span> Minimum 3 characters required </span>
            }
          </p>
        }
      </div>

      <!-- PHONE -->
      <div class="flex flex-col">
        <label class="mb-1 font-medium text-sm">Phone Number</label>
        <input
          type="tel"
          formControlName="phone"
          class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
        />

        @if (contactForm.get('phone')?.invalid && submitted) {
          <p class="text-red-500 text-xs mt-1">
            <span *ngIf="contactForm.get('phone')?.errors?.['required']">
              Phone number is required
            </span>
            <span *ngIf="contactForm.get('phone')?.errors?.['pattern']">
              Enter a valid 10-digit phone
            </span>
          </p>
        }
      </div>

      <!-- EMAIL -->
      <div class="flex flex-col">
        <label class="mb-1 font-medium text-sm">Email</label>
        <input
          type="email"
          formControlName="email"
          class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
        />

        <p *ngIf="contactForm.get('email')?.invalid && submitted" class="text-red-500 text-xs mt-1">
          <span *ngIf="contactForm.get('email')?.errors?.['required']"> Email is required </span>
          <span *ngIf="contactForm.get('email')?.errors?.['email']"> Enter a valid email </span>
        </p>
      </div>

      <!-- STATE -->
      <div class="flex flex-col">
        <label class="mb-1 font-medium text-sm">State</label>

        <select
          formControlName="state"
          class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select State</option>
          <ng-container *ngIf="states.length">
            <option *ngFor="let item of states" [value]="item.name">
              {{ item.name }}
            </option>
          </ng-container>
        </select>

        <p
          *ngIf="contactForm.get('states')?.invalid && submitted"
          class="text-red-500 text-xs mt-1"
        >
          State is required
        </p>
      </div>

      <!-- DEGREE -->
      <div class="flex flex-col">
        <label class="mb-1 font-medium text-sm">Degree</label>

        <select
          formControlName="degree"
          (change)="onDegreeChange()"
          class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Degree</option>
          <ng-container *ngIf="degrees.length">
            <option *ngFor="let item of degrees" [value]="item">
              {{ item }}
            </option>
          </ng-container>
        </select>

        <p
          *ngIf="contactForm.get('degree')?.invalid && submitted"
          class="text-red-500 text-xs mt-1"
        >
          Degree is required
        </p>
      </div>

      <!-- COURSE -->
      <div class="flex flex-col">
        <label class="mb-1 font-medium text-sm">Course</label>

        <select
          formControlName="course"
          class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Course</option>
          <ng-container *ngIf="courses.length">
            <option *ngFor="let c of courses" [value]="c.coursename">
              {{ c.coursename }}
            </option>
          </ng-container>
        </select>

        <p
          *ngIf="contactForm.get('course')?.invalid && submitted"
          class="text-red-500 text-xs mt-1"
        >
          Course is required
        </p>
      </div>

      <!-- SUBMIT -->
      <div class="md:col-span-2 text-center mt-4">
        <button
          type="submit"
          class="w-full sm:w-auto bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  </div>

  <!-- CONTACT INFO CARD -->
  <div class="max-w-5xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
      <!-- Address -->
      <div class="flex flex-col items-center md:items-start">
        <span class="text-xs text-gray-500 uppercase">Address</span>
        <h1 class="text-base font-semibold">
          3 Floor, Raymand Showroom,oppsite rathna hotel, Beside RTC complex,Rajahmundry
        </h1>
      </div>

      <!-- Email -->
      <div class="flex flex-col items-center md:items-start">
        <span class="text-xs text-gray-500 uppercase">Email</span>
        <h1 class="text-base font-semibold">mbcareersolutions1@gmail.com</h1>
      </div>

      <!-- Phone -->
      <div class="flex flex-col items-center md:items-start">
        <span class="text-xs text-gray-500 uppercase">Phone</span>
        <a href="tel:+917330824555">
          <h1 class="text-base font-semibold">+91 7330824555</h1>
        </a>
      </div>
    </div>
  </div>
</section>
`
})
export class Contactus implements OnInit {
  // master data
  allData: any[] = [
    {
      no: 0,
      degree: 'Select Degree',
      courses: [],
    },
    {
      no: 1,
      degree: 'B.Tech',
      courses: [
        { sno: 1, coursename: 'Mechanical Engineering' },
        { sno: 2, coursename: 'Civil Engineering' },
        { sno: 3, coursename: 'Computer Science Engineering' },
        { sno: 4, coursename: 'Information Technology' },
        { sno: 5, coursename: 'Electrical Engineering' },
        { sno: 6, coursename: 'Electronics and Communication Engineering' },
        { sno: 7, coursename: 'Artificial Intelligence' },
        { sno: 8, coursename: 'Data Science' },
        { sno: 9, coursename: 'Cyber Security' },
      ],
    },
    {
      no: 2,
      degree: 'B.Sc',
      courses: [
        { sno: 1, coursename: 'Physics' },
        { sno: 2, coursename: 'Chemistry' },
        { sno: 3, coursename: 'Mathematics' },
        { sno: 4, coursename: 'Computer Science' },
        { sno: 5, coursename: 'Biotechnology' },
        { sno: 6, coursename: 'Microbiology' },
        { sno: 7, coursename: 'Statistics' },
        { sno: 8, coursename: 'Electronics' },
      ],
    },
    {
      no: 3,
      degree: 'B.Com',
      courses: [
        { sno: 1, coursename: 'General' },
        { sno: 2, coursename: 'Accounting' },
        { sno: 3, coursename: 'Finance' },
        { sno: 4, coursename: 'Taxation' },
        { sno: 5, coursename: 'Banking and Insurance' },
      ],
    },
    {
      no: 4,
      degree: 'BA',
      courses: [
        { sno: 1, coursename: 'English' },
        { sno: 2, coursename: 'History' },
        { sno: 3, coursename: 'Economics' },
        { sno: 4, coursename: 'Political Science' },
        { sno: 5, coursename: 'Psychology' },
        { sno: 6, coursename: 'Sociology' },
        { sno: 7, coursename: 'Journalism' },
      ],
    },
    {
      no: 5,
      degree: 'BBA',
      courses: [
        { sno: 1, coursename: 'Finance' },
        { sno: 2, coursename: 'Marketing' },
        { sno: 3, coursename: 'Human Resource' },
        { sno: 4, coursename: 'International Business' },
        { sno: 5, coursename: 'Operations Management' },
      ],
    },
    {
      no: 6,
      degree: 'MBA',
      courses: [
        { sno: 1, coursename: 'Finance' },
        { sno: 2, coursename: 'Marketing' },
        { sno: 3, coursename: 'Human Resource' },
        { sno: 4, coursename: 'Operations' },
        { sno: 5, coursename: 'Information Technology' },
        { sno: 6, coursename: 'Business Analytics' },
      ],
    },
    {
      no: 7,
      degree: 'M.Tech',
      courses: [
        { sno: 1, coursename: 'Computer Science Engineering' },
        { sno: 2, coursename: 'Structural Engineering' },
        { sno: 3, coursename: 'Power Systems' },
        { sno: 4, coursename: 'Data Science' },
        { sno: 5, coursename: 'Artificial Intelligence' },
      ],
    },
    {
      no: 8,
      degree: 'M.Sc',
      courses: [
        { sno: 1, coursename: 'Physics' },
        { sno: 2, coursename: 'Chemistry' },
        { sno: 3, coursename: 'Mathematics' },
        { sno: 4, coursename: 'Computer Science' },
        { sno: 5, coursename: 'Biotechnology' },
      ],
    },
    {
      no: 9,
      degree: 'Law',
      courses: [
        { sno: 1, coursename: 'LLB' },
        { sno: 2, coursename: 'BA LLB' },
        { sno: 3, coursename: 'BBA LLB' },
        { sno: 4, coursename: 'LLM' },
      ],
    },
    {
      no: 10,
      degree: 'Medical',
      courses: [
        { sno: 1, coursename: 'MBBS' },
        { sno: 2, coursename: 'BDS' },
        { sno: 3, coursename: 'BAMS' },
        { sno: 4, coursename: 'BHMS' },
        { sno: 5, coursename: 'BPT' },
        { sno: 6, coursename: 'BPharm' },
      ],
    },
    {
      no: 11,
      degree: 'Design',
      courses: [
        { sno: 1, coursename: 'Fashion Design' },
        { sno: 2, coursename: 'Interior Design' },
        { sno: 3, coursename: 'Graphic Design' },
        { sno: 4, coursename: 'Animation' },
        { sno: 5, coursename: 'UI/UX Design' },
      ],
    },
    {
      no: 12,
      degree: 'Education',
      courses: [
        { sno: 1, coursename: 'B.Ed' },
        { sno: 2, coursename: 'M.Ed' },
        { sno: 3, coursename: 'D.El.Ed' },
      ],
    },
    {
      no: 13,
      degree: 'Diploma',
      courses: [
        { sno: 1, coursename: 'Diploma in Mechanical Engineering' },
        { sno: 2, coursename: 'Diploma in Civil Engineering' },
        { sno: 3, coursename: 'Diploma in Electrical Engineering' },
        { sno: 4, coursename: 'Diploma in Computer Engineering' },
      ],
    },
    {
      no: 14,
      degree: 'Professional',
      courses: [
        { sno: 1, coursename: 'Chartered Accountant (CA)' },
        { sno: 2, coursename: 'Company Secretary (CS)' },
        { sno: 3, coursename: 'Cost and Management Accountant (CMA)' },
      ],
    },
    {
      no: 15,
      degree: 'Vocational / ITI',
      courses: [
        { sno: 1, coursename: 'Electrician' },
        { sno: 2, coursename: 'Fitter' },
        { sno: 3, coursename: 'Welder' },
        { sno: 4, coursename: 'Computer Operator' },
      ],
    },
  ];
  states: any[] = [
    { id: 1, name: 'Andhra Pradesh' },
    { id: 2, name: 'Arunachal Pradesh' },
    { id: 3, name: 'Assam' },
    { id: 4, name: 'Bihar' },
    { id: 5, name: 'Chhattisgarh' },
    { id: 6, name: 'Goa' },
    { id: 7, name: 'Gujarat' },
    { id: 8, name: 'Haryana' },
    { id: 9, name: 'Himachal Pradesh' },
    { id: 10, name: 'Jharkhand' },
    { id: 11, name: 'Karnataka' },
    { id: 12, name: 'Kerala' },
    { id: 13, name: 'Madhya Pradesh' },
    { id: 14, name: 'Maharashtra' },
    { id: 15, name: 'Manipur' },
    { id: 16, name: 'Meghalaya' },
    { id: 17, name: 'Mizoram' },
    { id: 18, name: 'Nagaland' },
    { id: 19, name: 'Odisha' },
    { id: 20, name: 'Punjab' },
    { id: 21, name: 'Rajasthan' },
    { id: 22, name: 'Sikkim' },
    { id: 23, name: 'Tamil Nadu' },
    { id: 24, name: 'Telangana' },
    { id: 25, name: 'Tripura' },
    { id: 26, name: 'Uttar Pradesh' },
    { id: 27, name: 'Uttarakhand' },
    { id: 28, name: 'West Bengal' },
    { id: 29, name: 'Andaman and Nicobar Islands' },
    { id: 30, name: 'Chandigarh' },
    { id: 31, name: 'Dadra and Nagar Haveli and Daman and Diu' },
    { id: 32, name: 'Lakshadweep' },
    { id: 33, name: 'Delhi (National Capital Territory)' },
    { id: 34, name: 'Puducherry' },
    { id: 35, name: 'Jammu and Kashmir' },
    { id: 36, name: 'Ladakh' },
  ];

  // ---------------- DROPDOWNS ----------------
  degrees: string[] = [];
  courses: any[] = [];

  // ---------------- FORM STATE ----------------
  contactForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private _serv: ContcatusService,
    private formSubmission: FormSubmissionService,
  ) {}

  // ---------------- INIT ----------------
  ngOnInit(): void {
    this.createForm();
    this.extractDegrees();
  }

  // ---------------- FORM ----------------
  createForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      degree: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  // ---------------- DEGREE LIST ----------------
  extractDegrees(): void {
    this.degrees = this.allData.map((item) => item.degree);
  }

  // ---------------- COURSE LIST ----------------
  onDegreeChange(): void {
    const selectedDegree = this.contactForm.get('degree')?.value;

    const degreeObj = this.allData.find((item) => item.degree === selectedDegree);

    this.courses = degreeObj ? degreeObj.courses : [];

    // reset course when degree changes
    this.contactForm.patchValue({ course: '' });
  }

  // ---------------- SUBMIT ----------------
  submit(): void {
    this.submitted = true;
    this.successMessage = '';

    if (this.contactForm.invalid) {
      return;
    }

    const formData = this.contactForm.value;

    this.formSubmission.submit(`${URLS.backendapi}contact/create-info`, formData, 'Contact form').subscribe({
      next: (res) => {
        this.successMessage = res.success ? 'Your details have been submitted successfully!' : res.message;
        if (res.success) {
          this.contactForm.reset();
          this.submitted = false;
          this.courses = [];
        }
      },
    });
  }
}
