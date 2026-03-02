import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ContcatusService } from '../../../../serviceslayer/contactus.services';
import { contactServices } from '../../../../serviceslayer/contact.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css',
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
    private _postData: contactServices,
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

    console.log('Form Submitted:', formData);

    this._postData.createInfo(formData).subscribe({
      next: (res: any) => {
        if (res?.statuscode === 201) {
          this.successMessage = 'Your details have been submitted successfully!';
          this.contactForm.reset();
          this.submitted = false;
          this.courses = [];
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }
}
