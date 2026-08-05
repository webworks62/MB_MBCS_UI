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
<div class="min-h-screen bg-slate-100">

    <!-- Header -->
    <header
        class="h-16 bg-white shadow flex items-center justify-between px-8">

        <h1 class="text-2xl font-bold text-slate-800">
            MB Career Solutions
        </h1>

        <button
            (click)="logout()"
            class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition">
            Logout
        </button>

    </header>

    <div class="flex">

        <!-- Sidebar -->
        <aside
            class="w-72 min-h-[calc(100vh-64px)] bg-slate-900 text-white">

            <div class="text-center py-8 border-b border-slate-700">

                <div
                    class="w-20 h-20 rounded-full bg-blue-500 mx-auto flex items-center justify-center text-3xl font-bold">
                    A
                </div>

                <h2 class="mt-4 text-xl font-semibold">
                    Admin Panel
                </h2>

            </div>

            <nav class="flex flex-col p-5 gap-2">

                <!-- <button
                    (click)="active('Dashboard')"
                    [class]="activeon==='Dashboard'
                    ? activeClass
                    : normalClass">

                    📊 Dashboard

                </button> -->

                <button
                    (click)="active('student-review')"
                    [class]="activeon==='student-review'
                    ? activeClass
                    : normalClass">

                    🎓 Student Reviews

                </button>

                <button
                    (click)="active('scholarship')"
                    [class]="activeon==='scholarship'
                    ? activeClass
                    : normalClass">

                    🎁 Scholarship

                </button>

                <button
                    (click)="active('banner')"
                    [class]="activeon==='banner'
                    ? activeClass
                    : normalClass">

                    🖼 Banner Upload

                </button>

                <button
                    (click)="active('contactus')"
                    [class]="activeon==='contactus'
                    ? activeClass
                    : normalClass">

                    📩 Contact Us

                </button>

            </nav>

        </aside>

        <!-- Content -->
        <main class="flex-1 p-8">

            <!-- @if(activeon==="Dashboard"){

            <div>

                <h2 class="text-3xl font-bold mb-8">
                    Dashboard
                </h2>

                <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                    <div
                        class="bg-white rounded-xl shadow p-6">
                        <h3 class="text-gray-500">
                            Students
                        </h3>

                        <p class="text-4xl font-bold mt-3">
                            120
                        </p>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow p-6">
                        <h3 class="text-gray-500">
                            Reviews
                        </h3>

                        <p class="text-4xl font-bold mt-3">
                            45
                        </p>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow p-6">
                        <h3 class="text-gray-500">
                            Scholarships
                        </h3>

                        <p class="text-4xl font-bold mt-3">
                            18
                        </p>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow p-6">
                        <h3 class="text-gray-500">
                            Contacts
                        </h3>

                        <p class="text-4xl font-bold mt-3">
                            84
                        </p>
                    </div>

                </div>

            </div>

            } -->

            @if(activeon==="student-review"){

            <div class="bg-white rounded-xl shadow p-6">
                <h2 class="text-2xl font-bold mb-4">
                    Student Reviews
                </h2>
                <app-studentreview-comp />
            </div>

            }

            @if(activeon==="scholarship"){

            <div class="bg-white rounded-xl shadow p-6">
                <h2 class="text-2xl font-bold mb-4">
                    Scholarship Contacts
                </h2>

                <p class="text-gray-600">
                    Scholarship contact management.
                </p>

                                <app-schloarship-comp />

            </div>

            }

            @if(activeon==="banner"){

                <app-banners-comp />

            }

            @if(activeon==="contactus"){

            <div class="bg-white rounded-xl shadow p-6">
                <h2 class="text-2xl font-bold mb-4">
                    Contact Messages
                </h2>

            
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
        "bg-blue-600 text-white rounded-lg px-4 py-3 text-left transition";

    normalClass =
        "hover:bg-slate-800 rounded-lg px-4 py-3 text-left transition";

    constructor(private _serv: AdminService) { }

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


    // Banner Upload Section

    logout() {
        localStorage.removeItem("isAdmin");
        window.location.href = "/";
    }
}