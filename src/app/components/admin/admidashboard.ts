import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";
import { FormsModule } from "@angular/forms";
import { BannersComp } from "./sub/bannerscomp";
import { StudentReviewComp } from "./sub/studentreviewcomp";
import { SchloarshipComp } from "./sub/schloarshipcomp";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule, BannersComp, StudentReviewComp, SchloarshipComp],
  providers: [MessageService],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-6 flex items-center justify-between shadow-xs">
        <div class="flex items-center space-x-3">
          <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
            MB
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            MB Career Solutions
          </span>
        </div>

        <button
          (click)="logout()"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-slate-200 hover:border-red-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3 3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      <div class="flex flex-1">
        
        <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
          
          <div class="p-6 border-b border-slate-800/80 flex items-center gap-4">
            <div class="relative">
              <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-semibold shadow-inner">
                A
              </div>
              <span class="bottom-0 right-0 absolute w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-white">Administrator</h2>
              <span class="text-xs text-slate-400">System Admin</span>
            </div>
          </div>

          <nav class="flex-1 p-4 space-y-1">
            <button
              (click)="active('scholarship')"
              [class]="activeon === 'scholarship' ? activeClass : normalClass">
              <span class="text-lg">🎁</span>
              <span>Scholarship</span>
            </button>

            <button
              (click)="active('student-review')"
              [class]="activeon === 'student-review' ? activeClass : normalClass">
              <span class="text-lg">🎓</span>
              <span>Student Reviews</span>
            </button>

            <button
              (click)="active('banner')"
              [class]="activeon === 'banner' ? activeClass : normalClass">
              <span class="text-lg">🖼️</span>
              <span>Banner Upload</span>
            </button>
          </nav>
        </aside>

        <main class="flex-1 p-8 max-w-7xl">
          
          @if (activeon === 'scholarship') {
            <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 transition-all">
              <div class="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 class="text-xl font-bold text-slate-900">Scholarship Applications</h2>
                  <p class="text-sm text-slate-500 mt-0.5">Manage and review student scholarship requests</p>
                </div>
              </div>
              <app-schloarship-comp />
            </div>
          }

          @if (activeon === 'student-review') {
            <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 transition-all">
              <div class="mb-6 border-b border-slate-100 pb-4">
                <h2 class="text-xl font-bold text-slate-900">Student Reviews</h2>
                <p class="text-sm text-slate-500 mt-0.5">Moderate and publish student testimonials</p>
              </div>
              <app-studentreview-comp />
            </div>
          }

          @if (activeon === 'banner') {
            <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 transition-all">
              <app-banners-comp />
            </div>
          }

        </main>
      </div>
    </div>
  `
})
export class AdminDashboard implements OnInit {

  activeon = "scholarship";

  activeClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white bg-indigo-600 shadow-md shadow-indigo-600/20 transition-all text-left text-sm";

  normalClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all text-left text-sm";

  constructor(private _serv: AdminService) {}

  ngOnInit(): void {
    this.getall();
  }

  getall() {
    this.getallStudentReviews();
    this.getallContactForms();
  }

  getallContactForms() {
    this._serv.getAll().subscribe({
      next: (data: any) => {
        console.log("Contact Forms:", data);
      },
      error: (err: any) => {
        console.error("Error fetching contact forms:", err);
      }
    });
  }

  getallStudentReviews() {
    this._serv.getStudentReviews().subscribe({
      next: (data: any) => {
        console.log("Student Reviews:", data);
      },
      error: (err: any) => {
        console.error("Error fetching student reviews:", err);
      }
    });
  }

  active(value: string) {
    this.activeon = value;
  }

  logout() {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  }
}