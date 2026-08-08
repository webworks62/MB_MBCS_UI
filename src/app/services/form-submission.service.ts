import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface SubmissionResult<T = unknown> {
  success: boolean;
  queued: boolean;
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService {
  private readonly storageKey = 'mbcs-form-queue';

  constructor(private http: HttpClient) {}

  getAll<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  submit<T>(url: string, payload: unknown, label: string): Observable<SubmissionResult<T>> {
    return this.http.post<T>(url, payload).pipe(
      map((data) => ({
        success: true,
        queued: false,
        message: `${label} submitted successfully.`,
        data,
      })),
      catchError((error) => {
        this.queueSubmission(label, payload, url, error);
        return of({
          success: false,
          queued: true,
          message: `${label} could not be sent right now. Your request has been saved locally and will be sent when the service is available.`,
        });
      }),
    );
  }

  private queueSubmission(label: string, payload: unknown, url: string, error: unknown): void {
    const existing = this.readQueue();
    existing.push({
      label,
      payload,
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(this.storageKey, JSON.stringify(existing.slice(-10)));
  }

  private readQueue(): Array<Record<string, unknown>> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
