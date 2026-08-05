import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { URLS } from "../../../urls/URLS";
import { FormBuilder } from "@angular/forms";
import { FormSubmissionService } from "../../../services/form-submission.service";

@Component({
    selector: 'app-schloarship-comp',
    imports: [],
    template: `
    
    <section>
            <div class="bg-white rounded-xl shadow-lg mt-10 p-8">

        <div class="flex justify-between mb-6">

            <h2 class="text-2xl font-bold">
                Uploaded Banners
            </h2>

            <input
                type="text"
                placeholder="Search..."
                class="border rounded-lg px-4 py-2 w-72">

        </div>

        <div class="overflow-auto">

            <table class="w-full">

                <thead>

                    <tr class="bg-slate-100">

                        <th class="p-3 text-left">
                            Image
                        </th>

                        <th class="p-3 text-left">
                            Title
                        </th>

                        <th class="p-3 text-left">
                            Tags
                        </th>

                        <th class="p-3 text-left">
                            Status
                        </th>

                        <th class="p-3 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    @for(item of DataList;track item.id){

                    <tr class="border-b">

                        <td class="p-3">

                            <img
                                [src]="item.image"
                                class="w-28 h-16 rounded object-cover">

                        </td>

                        <td class="p-3">
                            {{item.title}}
                        </td>

                        <td class="p-3">
                            {{item.tags}}
                        </td>

                        <td class="p-3">

                            <span
                                [class]="item.status
                                ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full'
                                : 'bg-red-100 text-red-700 px-3 py-1 rounded-full'">

                                {{item.status ? 'Active' : 'Inactive'}}

                            </span>

                        </td>

                        <td class="p-3 space-x-2">

                            <button
                                class="bg-blue-500 text-white px-4 py-2 rounded">

                                Edit

                            </button>

                            <button
                                class="bg-red-500 text-white px-4 py-2 rounded">

                                Delete

                            </button>

                        </td>

                    </tr>

                    }

                </tbody>

            </table>

        </div>

    </div>
    </section>
    `
})
export class SchloarshipComp implements OnInit {

    // private http = inject(HttpClient);
    // private fb = inject(FormBuilder);
    // private formSubmission = inject(FormSubmissionService);
    // private messageService = inject(MessageService);
    // private cdr = inject(ChangeDetectorRef);

    constructor(private http: HttpClient, private messageService: MessageService, private cdr: ChangeDetectorRef) { }



    private apiUrl = `${URLS.backendapi}/contact-forms`;

    DataList: any[] = [];

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.http.get<any[]>(this.apiUrl).subscribe({
            next: (data: any[]) => {
                // Force new reference assignment to trigger UI change detection
                this.DataList = Array.isArray(data) ? [...data] : [];
                this.cdr.detectChanges();
                console.log(this.DataList);
            },
            error: () => {
                this.showError("Fetch Failed", "Unable to load banners list.");
            }
        });

    }

    showError(summary: string, detail: string) {
        this.messageService.add({
            severity: 'error',
            summary,
            detail,
            life: 3000
        });
    }
}