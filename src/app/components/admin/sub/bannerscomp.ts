import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { URLS } from "../../../urls/URLS";

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
    
    <div class="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans text-slate-800">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Banner Management</h1>
            <p class="text-sm text-slate-500 mt-1">Upload, update, and manage promotional site banners.</p>
          </div>
        </div>

        <!-- Banner Creator Panel -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
          <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Banner
          </h2>

          <div class="grid lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left: Dropzone & Upload -->
            <div class="lg:col-span-5 flex flex-col gap-4">
              <label class="block text-sm font-medium text-slate-700">Banner Asset</label>
              
              <div 
                (click)="fileInput.click()"
                class="group relative border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100/80 transition-all duration-200 rounded-xl h-64 flex flex-col items-center justify-center overflow-hidden cursor-pointer p-4 text-center"
              >
                @if (imagePreview) {
                  <img [src]="imagePreview" class="w-full h-full object-cover rounded-lg">
                  <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm">
                    Click to Change Image
                  </div>
                } @else {
                  <div class="p-4 rounded-full bg-white shadow-sm border border-slate-100 mb-3 group-hover:scale-110 transition-transform duration-200">
                    <svg class="w-8 h-8 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p class="text-sm font-semibold text-slate-700">Click to upload <span class="text-slate-400 font-normal">or drag and drop</span></p>
                  <p class="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP up to 5MB</p>
                }
              </div>

              <input
                #fileInput
                class="hidden"
                type="file"
                accept="image/*"
                (change)="onFileSelected($event)"
              >

              <button 
                (click)="uploadimg()"
                [disabled]="!selectedFile"
                class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-transparent bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-medium text-sm transition shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload File Asset
              </button>
            </div>

            <!-- Right: Metadata Form -->
            <div class="lg:col-span-7 space-y-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Banner Title</label>
                <input
                  type="text"
                  [(ngModel)]="title"
                  class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm shadow-sm"
                  placeholder="e.g. Early Bird Admissions Open"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
                <input
                  type="text"
                  [(ngModel)]="tags"
                  placeholder="Education, MBA, Scholarship"
                  class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm shadow-sm"
                >
                <p class="text-xs text-slate-400 mt-1">Separate multiple tags with commas.</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select 
                  [(ngModel)]="status" 
                  class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm shadow-sm cursor-pointer"
                >
                  <option [ngValue]="true">Active</option>
                  <option [ngValue]="false">Inactive</option>
                </select>
              </div>

              <div class="pt-2">
                <button
                  (click)="uploadBanner()"
                  class="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow transition"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Banner
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Table Listing Container -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          
          <!-- Table Toolbar -->
          <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Uploaded Banners</h2>
              <p class="text-xs text-slate-500 mt-0.5">Manage existing banners currently in your database.</p>
            </div>
            
            <div class="relative w-full sm:w-72">
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Search by title or tag..."
                class="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
              >
            </div>
          </div>

          <!-- Responsive Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <th class="py-3.5 px-6">Preview</th>
                  <th class="py-3.5 px-6">Title</th>
                  <th class="py-3.5 px-6">Tags</th>
                  <th class="py-3.5 px-6">Status</th>
                  <th class="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                @for(item of filteredDataList; track item.bannerId || $index){
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="py-3 px-6">
                      <div class="w-24 h-14 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          [src]="item.bannerURL || item.image"
                          class="w-full h-full object-cover"
                          alt="Banner Thumbnail"
                        >
                      </div>
                    </td>
                    <td class="py-3 px-6 font-medium text-slate-900">
                      {{ item.bannerTitle || item.title || 'Untitled Banner' }}
                    </td>
                    <td class="py-3 px-6">
                      <div class="flex flex-wrap gap-1">
                        @for (tag of (item.bannerTag || item.tags || '').split(','); track $index) {
                          @if(tag.trim()) {
                            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                              {{ tag.trim() }}
                            </span>
                          }
                        }
                      </div>
                    </td>
                    <td class="py-3 px-6">
                      <span
                        [class]="(item.bannerStatus ?? item.status)
                          ? 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200'"
                      >
                        <span [class]="(item.bannerStatus ?? item.status) ? 'w-1.5 h-1.5 rounded-full bg-emerald-500' : 'w-1.5 h-1.5 rounded-full bg-rose-500'"></span>
                        {{ (item.bannerStatus ?? item.status) ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="py-3 px-6 text-right">
                      <button 
                        (click)="deleteBanner(item.bannerId)"
                        class="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md border border-transparent hover:border-rose-200 transition"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="py-12 text-center text-slate-400">
                      <svg class="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p class="font-medium text-sm">No banners uploaded yet</p>
                      <p class="text-xs text-slate-400 mt-0.5">Upload a banner using the form above to get started.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  `
})
export class BannersComp implements OnInit {

  constructor(
    private http: HttpClient, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef
  ) { }

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
      this.showWarn("Missing Image", "Please click 'Upload File Asset' before saving.");
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
        this.DataList = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.showError("Fetch Failed", "Unable to load banners list.");
      }
    });
  }

deleteBanner(id: string) {
    if (!id) return;
    
    // Added { responseType: 'text' } to prevent JSON parsing errors 
    // if the backend returns a plain String message.
    this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe({
      next: (response) => {
        // response will be whatever text the backend sent, or empty
        this.showSuccess("Deleted", "Banner removed successfully.");
        this.getImagesData();
      },
      error: (err) => {
        console.error("Delete failed:", err);
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