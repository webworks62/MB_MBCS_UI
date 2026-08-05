import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ContactForm } from "../model/contact-form.model";
import { StudentReview } from "../components/pages/reviews/studentReview";
import { URLS } from "../urls/URLS"; // Update the path as needed

@Injectable({
    providedIn: "root"
})
export class AdminService {

    private readonly http = inject(HttpClient);

    private readonly contactApi = `${URLS.backendapi}/contact-forms`;
    private readonly reviewApi = `${URLS.backendapi}/student-reviews`;
    private readonly imageApi = `${URLS.backendapi}/images`;

    // ---------------- Contact Forms ----------------

    getAll() {
        return this.http.get<ContactForm[]>(this.contactApi);
    }

    getById(id: string) {
        return this.http.get<ContactForm>(`${this.contactApi}/${id}`);
    }

    // ---------------- Student Reviews ----------------

    getStudentReviews() {
        return this.http.get<StudentReview[]>(this.reviewApi);
    }

    getStudentReview(id: number) {
        return this.http.get<StudentReview>(`${this.reviewApi}/${id}`);
    }

    // ---------------- Image Upload ----------------

    uploadImage(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        return this.http.post(`${this.imageApi}/upload`, formData);
    }
}