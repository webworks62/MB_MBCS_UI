import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { subscribeServices } from '../../../../serviceslayer/subscribe.services';

@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe {
  subscribeForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private _serv: subscribeServices,
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

    console.log('Subscribed Email:', this.subscribeForm.value);

    this._serv.createInfo(email).subscribe({
      next: (res: any) => {
        if (res?.statuscode === 201) {
          this.successMessage = '🎉 Successfully subscribed to the newsletter!';
          this.subscribeForm.reset();
          this.submitted = false;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }
}
