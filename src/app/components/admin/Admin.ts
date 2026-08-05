// import { Component, OnInit, inject } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { FormsModule } from "@angular/forms";

// import { AdminService } from "../../serviceslayer/admin.service";
// import { ContactForm } from "../../model/contact-form.model";
// import { StudentReview } from "../pages/reviews/studentReview";

// @Component({
//     selector: "app-admin",
//     standalone: true,
//     imports: [CommonModule, FormsModule],
//     template: `
//         <div class="min-h-screen bg-gray-50">
//             <!-- Header -->
//             <div class="bg-white shadow sticky top-0 z-10">
//                 <div class="px-6 py-4">
//                     <div class="flex justify-between items-center gap-6">
//                         <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//                         <div class="w-72">
//                             <input
//                                 type="text"
//                                 [(ngModel)]="search"
//                                 (input)="filter()"
//                                 placeholder="Search by name, phone, or email..."
//                                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="p-6">
//                 <!-- Statistics Cards -->
//                 <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
//                     <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-l-4 border-blue-500">
//                         <p class="text-gray-500 text-sm font-medium">Total Applications</p>
//                         <h2 class="text-4xl font-bold text-gray-800 mt-2">{{ totalApplications }}</h2>
//                         <p class="text-gray-400 text-xs mt-2">All time applications</p>
//                     </div>

//                     <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-l-4 border-green-500">
//                         <p class="text-gray-500 text-sm font-medium">Today's Applications</p>
//                         <h2 class="text-4xl font-bold text-gray-800 mt-2">{{ todayApplications }}</h2>
//                         <p class="text-gray-400 text-xs mt-2">New applications today</p>
//                     </div>

//                     <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-l-4 border-purple-500">
//                         <p class="text-gray-500 text-sm font-medium">This Month</p>
//                         <h2 class="text-4xl font-bold text-gray-800 mt-2">{{ monthApplications }}</h2>
//                         <p class="text-gray-400 text-xs mt-2">Applications this month</p>
//                     </div>
//                 </div>

//                 <!-- Applications Table -->
//                 <div class="bg-white rounded-xl shadow mb-8 overflow-hidden">
//                     <div class="px-6 py-4 border-b border-gray-200">
//                         <h2 class="text-2xl font-bold text-gray-800">Applications</h2>
//                     </div>

//                     @if (filtered.length > 0) {
//                         <div class="overflow-x-auto">
//                             <table class="w-full">
//                                 <thead class="bg-gray-100 border-b border-gray-200">
//                                     <tr>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">State</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//                                         <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     @for (item of filtered; track item.id) {
//                                         <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ item.fullName }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ item.phoneNumber }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ item.email }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ item.course }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ item.state }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">
//                                                 {{ item.createdAt | date: "dd MMM yyyy" }}
//                                             </td>
//                                             <td class="px-6 py-4 text-center">
//                                                 <button
//                                                     (click)="view(item.id)"
//                                                     class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium text-sm"
//                                                 >
//                                                     👁️ View
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>
//                     } @else {
//                         <div class="p-12 text-center">
//                             <p class="text-gray-500 text-lg">No applications found</p>
//                         </div>
//                     }
//                 </div>

//                 <!-- Student Details Section -->
//                 @if (selected) {
//                     <div class="bg-white rounded-xl shadow mb-8 p-6 border-l-4 border-blue-500">
//                         <div class="flex justify-between items-center mb-6">
//                             <h2 class="text-2xl font-bold text-gray-800">Student Details</h2>
//                             <button
//                                 (click)="selected = undefined"
//                                 class="text-gray-500 hover:text-gray-700 font-bold text-xl"
//                             >
//                                 ✕
//                             </button>
//                         </div>

//                         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Full Name</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.fullName }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Phone</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.phoneNumber }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Email</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.email }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">District</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.district }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">State</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.state }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Family Income</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.familyIncome }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Institution</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.institutionName }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Current Class</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.currentClass }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Stream</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.stream }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Course</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.course }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Specialization</p>
//                                 <p class="text-gray-800 font-semibold">{{ selected.specialization }}</p>
//                             </div>
//                         </div>
//                     </div>
//                 }

//                 <!-- Student Reviews Section -->
//                 <div class="bg-white rounded-xl shadow mb-8 overflow-hidden">
//                     <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-transparent">
//                         <h2 class="text-2xl font-bold text-gray-800">Student Reviews</h2>
//                     </div>

//                     @if (reviews.length > 0) {
//                         <div class="overflow-x-auto">
//                             <table class="w-full">
//                                 <thead class="bg-gray-100 border-b border-gray-200">
//                                     <tr>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
//                                         <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
//                                         <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     @for (review of reviews; track review.id) {
//                                         <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ review.fullName }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ review.phone }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ review.email }}</td>
//                                             <td class="px-6 py-4 text-sm text-gray-800">{{ review.gender }}</td>
//                                             <td class="px-6 py-4 text-sm">
//                                                 <span
//                                                     class="inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs"
//                                                     [ngClass]="
//                                                         review.visibleStatus
//                                                             ? 'bg-green-100 text-green-800'
//                                                             : 'bg-red-100 text-red-800'
//                                                     "
//                                                 >
//                                                     {{ review.visibleStatus ? "✓ Visible" : "✕ Hidden" }}
//                                                 </span>
//                                             </td>
//                                             <td class="px-6 py-4 text-center">
//                                                 <button
//                                                     (click)="viewReview(review.id)"
//                                                     class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition font-medium text-sm"
//                                                 >
//                                                     👁️ View
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>
//                     } @else {
//                         <div class="p-12 text-center">
//                             <p class="text-gray-500 text-lg">No reviews found</p>
//                         </div>
//                     }
//                 </div>

//                 <!-- Review Details Section -->
//                 @if (selectedReview) {
//                     <div class="bg-white rounded-xl shadow mb-8 p-6 border-l-4 border-purple-500">
//                         <div class="flex justify-between items-center mb-6">
//                             <h2 class="text-2xl font-bold text-gray-800">Review Details</h2>
//                             <button
//                                 (click)="selectedReview = undefined"
//                                 class="text-gray-500 hover:text-gray-700 font-bold text-xl"
//                             >
//                                 ✕
//                             </button>
//                         </div>

//                         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Full Name</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.fullName }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Date of Birth</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.dob | date: "dd MMM yyyy" }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Phone</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.phone }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Email</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.email }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Gender</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.gender }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Aadhar Number</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.aadharNo }}</p>
//                             </div>
//                             <div class="space-y-2 md:col-span-2">
//                                 <p class="text-gray-500 text-sm font-medium">Address</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.address }}</p>
//                             </div>
//                             <div class="space-y-2">
//                                 <p class="text-gray-500 text-sm font-medium">Created Date</p>
//                                 <p class="text-gray-800 font-semibold">{{ selectedReview.createdAt | date: "dd MMM yyyy" }}</p>
//                             </div>
//                         </div>

//                         <div class="mt-6 border-t pt-6">
//                             <h3 class="text-lg font-bold text-gray-800 mb-3">Feedback</h3>
//                             <p class="text-gray-700 leading-relaxed">{{ selectedReview.feedback }}</p>
//                         </div>

//                         @if (selectedReview.signature) {
//                             <div class="mt-6 border-t pt-6">
//                                 <h3 class="text-lg font-bold text-gray-800 mb-3">Signature</h3>
//                                 <img
//                                     [src]="selectedReview.signature"
//                                     alt="Signature"
//                                     class="h-32 border-2 border-gray-200 rounded-lg"
//                                 />
//                             </div>
//                         }
//                     </div>
//                 }

//                 <!-- Image Upload Section -->
//                 <div class="bg-white rounded-xl shadow p-6 border-t-4 border-orange-500">
//                     <h2 class="text-2xl font-bold text-gray-800 mb-4">Upload Image</h2>
//                     <div class="flex items-center gap-4">
//                         <label
//                             for="file-input"
//                             class="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg cursor-pointer transition font-medium"
//                         >
//                             📤 Choose File
//                         </label>
//                         <input
//                             id="file-input"
//                             type="file"
//                             (change)="upload($event)"
//                             class="hidden"
//                             accept="image/*"
//                         />
//                         <span class="text-gray-500 text-sm">{{ selectedFile?.name || "No file selected" }}</span>
//                     </div>
//                     @if (uploadProgress) {
//                         <div class="mt-4">
//                             <div class="w-full bg-gray-200 rounded-full h-2">
//                                 <div class="bg-orange-600 h-2 rounded-full transition" [style.width.%]="uploadProgress"></div>
//                             </div>
//                             <p class="text-sm text-gray-600 mt-2">{{ uploadProgress }}% uploaded</p>
//                         </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     `,
//     styles: [`
//         :host {
//             display: block;
//         }
//     `]
// })
// export class AdminComponent implements OnInit {
//     service = inject(AdminService);

//     applications: ContactForm[] = [];
//     filtered: ContactForm[] = [];
//     selected?: ContactForm;

//     reviews: StudentReview[] = [];
//     selectedReview?: StudentReview;

//     search = "";
//     selectedFile?: File;
//     uploadProgress = 0;

//     ngOnInit() {
//         this.load();
//         this.loadReviews();
//     }

//     load() {
//         this.service.getAll().subscribe({
//             next: (res) => {
//                 this.applications = res;
//                 this.filtered = res;
//             },
//             error: (err) => console.error("Error loading applications:", err)
//         });
//     }

//     loadReviews() {
//         this.service.getStudentReviews().subscribe({
//             next: (res) => {
//                 this.reviews = res;
//             },
//             error: (err) => console.error("Error loading reviews:", err)
//         });
//     }

//     upload(event: any) {
//         const file = event.target.files[0];
//         if (!file) return;

//         this.selectedFile = file;
//         this.uploadProgress = 0;

//         // Simulate progress
//         const interval = setInterval(() => {
//             if (this.uploadProgress < 90) {
//                 this.uploadProgress += Math.random() * 30;
//             }
//         }, 200);

//         this.service.uploadImage(file).subscribe({
//             next: (res) => {
//                 clearInterval(interval);
//                 this.uploadProgress = 100;
//                 setTimeout(() => {
//                     alert("✓ Image Uploaded Successfully");
//                     this.uploadProgress = 0;
//                     this.selectedFile = undefined;
//                     event.target.value = "";
//                 }, 500);
//             },
//             error: (err) => {
//                 clearInterval(interval);
//                 console.error("Upload error:", err);
//                 alert("✕ Error uploading image");
//                 this.uploadProgress = 0;
//             }
//         });
//     }

//     viewReview(id: number) {
//         this.service.getStudentReview(id).subscribe({
//             next: (res) => {
//                 this.selectedReview = res;
//             },
//             error: (err) => console.error("Error loading review:", err)
//         });
//     }

//     filter() {
//         const value = this.search.toLowerCase();
//         this.filtered = this.applications.filter((x) =>
//             x.fullName.toLowerCase().includes(value) ||
//             x.phoneNumber.includes(value) ||
//             x.email.toLowerCase().includes(value)
//         );
//     }

//     view(id: string) {
//         this.service.getById(id).subscribe({
//             next: (res) => {
//                 this.selected = res;
//             },
//             error: (err) => console.error("Error loading application:", err)
//         });
//     }

//     get totalApplications(): number {
//         return this.applications.length;
//     }

//     get todayApplications(): number {
//         const today = new Date().toDateString();
//         return this.applications.filter(
//             (x) => new Date(x.createdAt).toDateString() === today
//         ).length;
//     }

//     get monthApplications(): number {
//         const now = new Date();
//         return this.applications.filter((x) => {
//             const d = new Date(x.createdAt);
//             return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
//         }).length;
//     }
// }