import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { URLS } from "../../../urls/URLS";

@Component({
    selector: 'app-schloarship-comp',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    template: `
        <section class="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            <div class="max-w-7xl mx-auto">

                <!-- HEADER -->
                <div class="mb-6">

                    <div class="flex flex-col lg:flex-row
                                lg:items-center lg:justify-between gap-4">

                        <div>

                            <h1 class="text-2xl sm:text-3xl
                                       font-bold text-slate-800">

                                Scholarship Applications

                            </h1>

                            <p class="text-sm text-slate-500 mt-1">

                                Manage and review student scholarship applications

                            </p>

                        </div>


                        <!-- SEARCH -->
                        <div class="relative w-full lg:w-96">

                            <span
                                class="absolute left-3 top-1/2
                                       -translate-y-1/2
                                       text-slate-400">

                                🔍

                            </span>

                            <input
                                type="text"
                                [(ngModel)]="searchText"
                                placeholder="Search by name, phone, email, course..."
                                class="w-full pl-10 pr-4 py-3
                                       bg-white
                                       border border-slate-200
                                       rounded-xl
                                       outline-none
                                       focus:ring-2
                                       focus:ring-blue-500
                                       focus:border-transparent
                                       shadow-sm">

                        </div>

                    </div>

                </div>


                <!-- STATISTICS -->

                <div class="grid grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-4 mb-6">


                    <!-- TOTAL -->

                    <div
                        class="bg-white rounded-2xl
                               p-5 shadow-sm
                               border border-slate-100">

                        <div class="flex items-center
                                    justify-between">

                            <div>

                                <p class="text-sm text-slate-500">
                                    Total Applications
                                </p>

                                <h2 class="text-2xl font-bold
                                           text-slate-800 mt-1">

                                    {{ DataList.length }}

                                </h2>

                            </div>

                            <div
                                class="w-12 h-12 rounded-xl
                                       bg-blue-100
                                       flex items-center
                                       justify-center text-xl">

                                🎓

                            </div>

                        </div>

                    </div>


                    <!-- UNDERGRADUATE -->

                    <div
                        class="bg-white rounded-2xl
                               p-5 shadow-sm
                               border border-slate-100">

                        <div class="flex items-center
                                    justify-between">

                            <div>

                                <p class="text-sm text-slate-500">
                                    Undergraduate
                                </p>

                                <h2 class="text-2xl font-bold
                                           text-blue-600 mt-1">

                                    {{ getUndergraduateCount() }}

                                </h2>

                            </div>

                            <div
                                class="w-12 h-12 rounded-xl
                                       bg-blue-100
                                       flex items-center
                                       justify-center text-xl">

                                📚

                            </div>

                        </div>

                    </div>


                    <!-- B TECH -->

                    <div
                        class="bg-white rounded-2xl
                               p-5 shadow-sm
                               border border-slate-100">

                        <div class="flex items-center
                                    justify-between">

                            <div>

                                <p class="text-sm text-slate-500">
                                    B.Tech Applications
                                </p>

                                <h2 class="text-2xl font-bold
                                           text-purple-600 mt-1">

                                    {{ getCourseCount('B Tech') }}

                                </h2>

                            </div>

                            <div
                                class="w-12 h-12 rounded-xl
                                       bg-purple-100
                                       flex items-center
                                       justify-center text-xl">

                                💻

                            </div>

                        </div>

                    </div>


                    <!-- AVERAGE MARKS -->

                    <div
                        class="bg-white rounded-2xl
                               p-5 shadow-sm
                               border border-slate-100">

                        <div class="flex items-center
                                    justify-between">

                            <div>

                                <p class="text-sm text-slate-500">
                                    Average Marks
                                </p>

                                <h2 class="text-2xl font-bold
                                           text-green-600 mt-1">

                                    {{ getAverageMarks() }}%

                                </h2>

                            </div>

                            <div
                                class="w-12 h-12 rounded-xl
                                       bg-green-100
                                       flex items-center
                                       justify-center text-xl">

                                📊

                            </div>

                        </div>

                    </div>

                </div>


                <!-- TABLE -->

                <div
                    class="bg-white rounded-2xl
                           shadow-sm
                           border border-slate-100
                           overflow-hidden">


                    <!-- TABLE HEADER -->

                    <div
                        class="px-5 py-4
                               border-b border-slate-100
                               flex flex-col sm:flex-row
                               sm:items-center
                               sm:justify-between gap-3">

                        <div>

                            <h2 class="text-lg font-semibold
                                       text-slate-800">

                                Scholarship Applications

                            </h2>

                            <p class="text-xs text-slate-500 mt-1">

                                {{ filteredData.length }} applications found

                            </p>

                        </div>


                        <!-- REFRESH -->

                        <button
                            type="button"
                            (click)="getData()"
                            class="px-4 py-2
                                   rounded-lg
                                   bg-slate-100
                                   hover:bg-slate-200
                                   text-slate-700
                                   text-sm font-medium
                                   transition">

                            ↻ Refresh

                        </button>

                    </div>


                    <!-- TABLE -->

                    <div class="overflow-x-auto">

                        <table
                            class="w-full min-w-[1400px]">


                            <!-- HEAD -->

                            <thead>

                                <tr
                                    class="bg-slate-50
                                           border-b
                                           border-slate-200">


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Student

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Contact

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Institution

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Education

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Marks

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Course

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Specialization

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-left
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Applied On

                                    </th>


                                    <th
                                        class="px-5 py-4
                                               text-center
                                               text-xs
                                               font-semibold
                                               text-slate-500
                                               uppercase">

                                        Action

                                    </th>

                                </tr>

                            </thead>


                            <!-- BODY -->

                            <tbody>

                                @for (
                                    item of filteredData;
                                    track item.id
                                ) {

                                    <tr
                                        class="border-b
                                               border-slate-100
                                               hover:bg-slate-50
                                               transition">


                                        <!-- STUDENT -->

                                        <td class="px-5 py-4">

                                            <div
                                                class="flex items-center
                                                       gap-3">

                                                <div
                                                    class="w-11 h-11
                                                           rounded-full
                                                           bg-gradient-to-br
                                                           from-blue-500
                                                           to-indigo-600
                                                           text-white
                                                           flex items-center
                                                           justify-center
                                                           font-bold">

                                                    {{ getInitials(item.fullName) }}

                                                </div>


                                                <div>

                                                    <p
                                                        class="font-semibold
                                                               text-slate-800">

                                                        {{ item.fullName }}

                                                    </p>

                                                    <p
                                                        class="text-xs
                                                               text-slate-400
                                                               mt-1">

                                                        {{ item.state }}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        <!-- CONTACT -->

                                        <td class="px-5 py-4">

                                            <p
                                                class="text-sm
                                                       font-medium
                                                       text-slate-700">

                                                {{ item.phoneNumber }}

                                            </p>

                                            <p
                                                class="text-xs
                                                       text-slate-500
                                                       mt-1">

                                                {{ item.email }}

                                            </p>

                                        </td>


                                        <!-- INSTITUTION -->

                                        <td class="px-5 py-4">

                                            <div>

                                                <p
                                                    class="text-sm
                                                           font-medium
                                                           text-slate-700">

                                                    {{ item.institutionName }}

                                                </p>

                                                <span
                                                    class="inline-flex
                                                           mt-2
                                                           px-2.5 py-1
                                                           rounded-full
                                                           bg-slate-100
                                                           text-slate-600
                                                           text-xs">

                                                    {{ item.state }}

                                                </span>

                                            </div>

                                        </td>


                                        <!-- EDUCATION -->

                                        <td class="px-5 py-4">

                                            <span
                                                class="inline-flex
                                                       px-3 py-1.5
                                                       rounded-full
                                                       bg-blue-50
                                                       text-blue-700
                                                       text-xs
                                                       font-semibold">

                                                {{ item.currentClass }}

                                            </span>

                                            <p
                                                class="text-xs
                                                       text-slate-500
                                                       mt-2">

                                                {{ item.stream }}

                                            </p>

                                        </td>


                                        <!-- MARKS -->

                                        <td class="px-5 py-4">

                                            <div
                                                class="flex items-center
                                                       gap-3">

                                                <div
                                                    class="w-16 h-2
                                                           bg-slate-200
                                                           rounded-full
                                                           overflow-hidden">

                                                    <div
                                                        class="h-full
                                                               bg-green-500
                                                               rounded-full"
                                                        [style.width.%]="getMarks(item.marks9th)">

                                                    </div>

                                                </div>

                                                <span
                                                    class="text-sm
                                                           font-semibold
                                                           text-slate-700">

                                                    {{ item.marks9th }}%

                                                </span>

                                            </div>

                                        </td>


                                        <!-- COURSE -->

                                        <td class="px-5 py-4">

                                            <span
                                                class="inline-flex
                                                       px-3 py-1.5
                                                       rounded-lg
                                                       bg-purple-50
                                                       text-purple-700
                                                       text-xs
                                                       font-semibold">

                                                {{ item.course }}

                                            </span>

                                        </td>


                                        <!-- SPECIALIZATION -->

                                        <td class="px-5 py-4">

                                            <p
                                                class="text-sm
                                                       text-slate-600
                                                       max-w-[180px]">

                                                {{ item.specialization }}

                                            </p>

                                        </td>


                                        <!-- CREATED -->

                                        <td class="px-5 py-4">

                                            <span
                                                class="text-sm
                                                       text-slate-600">

                                                {{ formatDateTime(item.createdAt) }}

                                            </span>

                                        </td>


                                        <!-- ACTION -->

                                        <td class="px-5 py-4">

                                            <div
                                                class="flex items-center
                                                       justify-center
                                                       gap-2">


                                                <!-- VIEW -->

                                                <button
                                                    type="button"
                                                    (click)="viewApplication(item)"
                                                    class="w-9 h-9
                                                           rounded-lg
                                                           bg-blue-50
                                                           text-blue-600
                                                           hover:bg-blue-100
                                                           transition"
                                                    title="View">

                                                    👁

                                                </button>


                                                <!-- EDIT -->

                                                <button
                                                    type="button"
                                                    (click)="editApplication(item)"
                                                    class="w-9 h-9
                                                           rounded-lg
                                                           bg-amber-50
                                                           text-amber-600
                                                           hover:bg-amber-100
                                                           transition"
                                                    title="Edit">

                                                    ✏️

                                                </button>


                                                <!-- DELETE -->

                                                <button
                                                    type="button"
                                                    (click)="deleteApplication(item)"
                                                    class="w-9 h-9
                                                           rounded-lg
                                                           bg-red-50
                                                           text-red-600
                                                           hover:bg-red-100
                                                           transition"
                                                    title="Delete">

                                                    🗑️

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                }


                                <!-- EMPTY -->

                                @if (filteredData.length === 0) {

                                    <tr>

                                        <td
                                            colspan="9"
                                            class="px-5 py-16
                                                   text-center">

                                            <div
                                                class="flex flex-col
                                                       items-center">

                                                <div
                                                    class="w-16 h-16
                                                           rounded-full
                                                           bg-slate-100
                                                           flex items-center
                                                           justify-center
                                                           text-2xl mb-4">

                                                    🎓

                                                </div>

                                                <h3
                                                    class="font-semibold
                                                           text-slate-700">

                                                    No applications found

                                                </h3>

                                                <p
                                                    class="text-sm
                                                           text-slate-400
                                                           mt-1">

                                                    Try changing your search.

                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </section>
    `
})
export class SchloarshipComp implements OnInit {

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {}


    private apiUrl = `${URLS.backendapi}/contact-forms`;

    DataList: any[] = [];

    searchText = '';


    // ============================
    // INIT
    // ============================

    ngOnInit(): void {

        this.getData();

    }


    // ============================
    // GET DATA
    // ============================

    getData(): void {

        this.http.get<any[]>(this.apiUrl).subscribe({

            next: (data: any[]) => {

                this.DataList = Array.isArray(data)
                    ? [...data]
                    : [];

                this.cdr.detectChanges();

                console.log(
                    "Scholarship Applications:",
                    this.DataList
                );

            },

            error: (error) => {

                console.error(error);

                this.showError(
                    "Fetch Failed",
                    "Unable to load scholarship applications."
                );

            }

        });

    }


    // ============================
    // SEARCH
    // ============================

    get filteredData(): any[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();

        if (!search) {

            return this.DataList;

        }

        return this.DataList.filter(item =>

            item.fullName
                ?.toLowerCase()
                .includes(search)

            ||

            item.phoneNumber
                ?.toLowerCase()
                .includes(search)

            ||

            item.email
                ?.toLowerCase()
                .includes(search)

            ||

            item.state
                ?.toLowerCase()
                .includes(search)

            ||

            item.institutionName
                ?.toLowerCase()
                .includes(search)

            ||

            item.currentClass
                ?.toLowerCase()
                .includes(search)

            ||

            item.stream
                ?.toLowerCase()
                .includes(search)

            ||

            item.course
                ?.toLowerCase()
                .includes(search)

            ||

            item.specialization
                ?.toLowerCase()
                .includes(search)

        );

    }


    // ============================
    // INITIALS
    // ============================

    getInitials(name: string): string {

        if (!name) {

            return '?';

        }

        return name
            .trim()
            .split(' ')
            .filter((word: string) => word.length > 0)
            .slice(0, 2)
            .map(
                (word: string) =>
                    word.charAt(0).toUpperCase()
            )
            .join('');

    }


    // ============================
    // DATE
    // ============================

    formatDateTime(date: string): string {

        if (!date) {

            return '-';

        }

        return new Date(date).toLocaleString(
            'en-IN',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        );

    }


    // ============================
    // MARKS
    // ============================

    getMarks(value: any): number {

        const marks = Number(value);

        if (isNaN(marks)) {

            return 0;

        }

        return Math.min(
            Math.max(marks, 0),
            100
        );

    }


    // ============================
    // UNDERGRADUATE COUNT
    // ============================

    getUndergraduateCount(): number {

        return this.DataList.filter(
            item =>
                item.currentClass
                    ?.toLowerCase()
                    .includes('undergraduate')
        ).length;

    }


    // ============================
    // COURSE COUNT
    // ============================

    getCourseCount(course: string): number {

        return this.DataList.filter(
            item =>
                item.course
                    ?.trim()
                    .toLowerCase() ===
                course
                    .trim()
                    .toLowerCase()
        ).length;

    }


    // ============================
    // AVERAGE MARKS
    // ============================

    getAverageMarks(): string {

        if (this.DataList.length === 0) {

            return '0';

        }

        const validMarks = this.DataList
            .map(item => Number(item.marks9th))
            .filter(mark => !isNaN(mark));

        if (validMarks.length === 0) {

            return '0';

        }

        const total =
            validMarks.reduce(
                (sum, mark) => sum + mark,
                0
            );

        return (
            total / validMarks.length
        ).toFixed(1);

    }


    // ============================
    // VIEW
    // ============================

    viewApplication(item: any): void {

        console.log(
            "View scholarship application:",
            item
        );

        // Open your details dialog here

    }


    // ============================
    // EDIT
    // ============================

    editApplication(item: any): void {

        console.log(
            "Edit scholarship application:",
            item
        );

        // Open your edit dialog/form here

    }


    // ============================
    // DELETE
    // ============================

    deleteApplication(item: any): void {

        const confirmed = confirm(
            `Are you sure you want to delete the scholarship application of ${item.fullName}?`
        );

        if (!confirmed) {

            return;

        }


        this.http.delete(
            `${this.apiUrl}/${item.id}`
        ).subscribe({

            next: () => {

                this.DataList =
                    this.DataList.filter(
                        application =>
                            application.id !== item.id
                    );

                this.cdr.detectChanges();

                this.messageService.add({

                    severity: 'success',

                    summary: 'Deleted',

                    detail:
                        'Scholarship application deleted successfully.',

                    life: 3000

                });

            },

            error: (error) => {

                console.error(error);

                this.showError(
                    'Delete Failed',
                    'Unable to delete scholarship application.'
                );

            }

        });

    }


    // ============================
    // ERROR
    // ============================

    showError(
        summary: string,
        detail: string
    ): void {

        this.messageService.add({

            severity: 'error',

            summary,

            detail,

            life: 3000

        });

    }

}