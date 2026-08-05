import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormSubmissionService } from '../../../services/form-submission.service';
import { URLS } from '../../../urls/URLS';

@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule],
template:`<div class="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6">
  <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800">Subscribe to our newsletter</h2>

    <p class="mt-3 text-gray-600">
      Get career tips, job updates, and exclusive opportunities straight to your inbox.
    </p>

    <form
      [formGroup]="subscribeForm"
      (ngSubmit)="subscribe()"
      class="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
    >
      <input
        type="email"
        formControlName="email"
        placeholder="Enter your email address"
        class="w-full sm:w-96 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
      />

      <button
        type="submit"
        class="px-6 py-3 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition shadow-md"
      >
        Subscribe
      </button>
    </form>

    <!-- ERROR MESSAGE -->
    @if (submitted && subscribeForm.get('email')?.invalid) {
      <p class="mt-2 text-sm text-red-500 text-center">
        @if (subscribeForm.get('email')?.errors?.['required']) {
          <span> Email is required </span>
        }
        @if (subscribeForm.get('email')?.errors?.['email']) {
          <span> Enter a valid email address </span>
        }
      </p>
    }

    <!-- SUCCESS MESSAGE -->
     @if (successMessage) {
    <p  class="mt-2 text-sm text-green-600 text-center font-medium">
      {{ successMessage }}
    </p>}

    <p class="mt-4 text-sm text-gray-400">We respect your privacy. Unsubscribe anytime.</p>
  </div>
</div>
`
})
export class Subscribe {
  subscribeForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private formSubmission: FormSubmissionService,
  ) {}

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  subscribe(): void {
    this.submitted = true;
    this.successMessage = '';

    if (this.subscribeForm.invalid) {
      return;
    }

    const email = this.subscribeForm.value;

    this.formSubmission.submit(`${URLS.backendapi}subscribe/create`, email, 'Newsletter subscription').subscribe({
      next: (res) => {
        this.successMessage = res.success ? '🎉 Successfully subscribed to the newsletter!' : res.message;
        if (res.success) {
          this.subscribeForm.reset();
          this.submitted = false;
        }
      },
    });
  }
}
