import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormsModule } from "@angular/forms";
import { URLS } from "../../../urls/URLS";
import { FormSubmissionService } from "../../../services/form-submission.service";

import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-banners-comp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService],
  template: `
    <p-toast position="top-right" [baseZIndex]="5000"></p-toast>
    
    <div class="p-8 bg-slate-100 min-h-screen">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Banner Management</h1>
        </div>

        <div class="grid lg:grid-cols-2 gap-10">
          <!-- Upload Section -->
          <div>
            <label class="font-semibold block mb-2">Banner Image</label>
            <div class="border-2 border-dashed border-gray-300 rounded-xl h-72 flex items-center justify-center overflow-hidden cursor-pointer">
              @if(imagePreview){
                <img [src]="imagePreview" class="w-full h-full object-cover">
              } @else {
                <div class="text-center">
                  <div class="text-6xl">📷</div>
                  <p class="text-gray-500 mt-3">Select Image</p>
                </div>
              }
            </div>

            <div class="flex items-center gap-3 mt-4">
              <input
                class="border rounded-lg px-2 py-2 text-sm flex-1"
                type="file"
                accept="image/*"
                (change)="onFileSelected($event)"
              >
              <button 
                class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
                (click)="uploadimg()"
              >
                Upload Image
              </button>
            </div>
          </div>

          <!-- Details -->
          <div class="space-y-5">
            <div>
              <label class="block mb-2 font-semibold">Banner Title</label>
              <input
                type="text"
                [(ngModel)]="title"
                class="w-full border rounded-lg p-3"
                placeholder="Enter title"
              >
            </div>

            <div>
              <label class="block mb-2 font-semibold">Tags</label>
              <input
                type="text"
                [(ngModel)]="tags"
                placeholder="Education, MBA, Scholarship"
                class="w-full border rounded-lg p-3"
              >
            </div>

            <div>
              <label class="block mb-2 font-semibold">Status</label>
              <select [(ngModel)]="status" class="w-full border rounded-lg p-3">
                <option [ngValue]="true">Active</option>
                <option [ngValue]="false">Inactive</option>
              </select>
            </div>

            <button
              (click)="uploadBanner()"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Save Banner
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-xl shadow-lg mt-10 p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Uploaded Banners</h2>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Search..."
            class="border rounded-lg px-4 py-2 w-72"
          >
        </div>

        <div class="overflow-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-slate-100 border-b">
                <th class="p-3 text-left">Image</th>
                <th class="p-3 text-left">Title</th>
                <th class="p-3 text-left">Tags</th>
                <th class="p-3 text-left">Status</th>
                <th class="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              @for(item of filteredDataList; track item.bannerId || $index){
                <tr class="border-b hover:bg-slate-50 transition">
                  <td class="p-3">
                    <img
                      [src]="item.bannerURL || item.image"
                      class="w-28 h-16 rounded object-cover border"
                      alt="Banner Image"
                    >
                  </td>
                  <td class="p-3 font-medium">
                    {{ item.bannerTitle || item.title }}
                  </td>
                  <td class="p-3 text-gray-600">
                    {{ item.bannerTag || item.tags }}
                  </td>
                  <td class="p-3">
                    <span
                      [class]="(item.bannerStatus ?? item.status)
                        ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold'
                        : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold'"
                    >
                      {{ (item.bannerStatus ?? item.status) ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="p-3 space-x-2">
                    <button 
                      (click)="deleteBanner(item.bannerId)"
                      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="text-center p-6 text-gray-500">
                    No banners uploaded yet.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class BannersComp implements OnInit {

  // private http = inject(HttpClient);
  // private fb = inject(FormBuilder);
  // private formSubmission = inject(FormSubmissionService);
  // private messageService = inject(MessageService);
  // private cdr = inject(ChangeDetectorRef);

  constructor(private http: HttpClient, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  private apiUrl = `${URLS.backendapi}/banner`;
  private api = `${URLS.backendapi}/images/upload`;

  DataList: any[] = [];
  uploadedImage: any;
  searchTerm = "";

  imagePreview: string | ArrayBuffer | null = null;
  title = "";
  tags = "";
  status = true;
  selectedFile!: File;

  ngOnInit() {
    this.getImagesData();
  }

  get filteredDataList() {
    if (!this.searchTerm.trim()) return this.DataList;
    const term = this.searchTerm.toLowerCase();
    return this.DataList.filter(item =>
      (item.bannerTitle || item.title || '').toLowerCase().includes(term) ||
      (item.bannerTag || item.tags || '').toLowerCase().includes(term)
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadimg() {
    if (!this.selectedFile) {
      this.showWarn("No Image", "Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this.http.post<any>(this.api, formData).subscribe({
      next: (response) => {
        this.uploadedImage = response;
        const imageUrl = response.imId || response.url || response;
        localStorage.setItem("uploadedImageUrl", imageUrl);

        this.showSuccess("Upload Successful", "Image uploaded successfully.");
      },
      error: () => {
        this.showError("Upload Failed", "Unable to upload image.");
      }
    });
  }

  uploadBanner() {
    const uploadedUrl = localStorage.getItem("uploadedImageUrl");

    if (!uploadedUrl) {
      this.showWarn("Missing Image", "Please click 'Upload Image' before saving.");
      return;
    }

    const form = {
      bannerTitle: this.title,
      bannerTag: this.tags,
      bannerStatus: this.status,
      bannerURL: uploadedUrl
    };

    this.http.post<any>(this.apiUrl, form).subscribe({
      next: () => {
        this.showSuccess("Banner Saved", "Banner uploaded successfully.");
        localStorage.removeItem("uploadedImageUrl");

        // Reset form
        this.title = "";
        this.tags = "";
        this.status = true;
        this.imagePreview = null;

        // Refresh table list
        this.getImagesData();
      },
      error: () => {
        this.showError("Save Failed", "Unable to save banner.");
      }
    });
  }

  getImagesData() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data: any[]) => {
        // Force new reference assignment to trigger UI change detection
        this.DataList = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.showError("Fetch Failed", "Unable to load banners list.");
      }
    });
  }

  deleteBanner(id: any) {
    if (!id) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.showSuccess("Deleted", "Banner removed successfully.");
        this.getImagesData();
      },
      error: () => {
        this.showError("Error", "Could not delete banner.");
      }
    });
  }

  showSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail, life: 3000 });
  }

  showWarn(summary: string, detail: string) {
    this.messageService.add({ severity: 'warn', summary, detail, life: 3000 });
  }
}