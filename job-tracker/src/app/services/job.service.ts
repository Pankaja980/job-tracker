import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { JobApplication } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // ✅ Base API URL without query parameters
  private readonly baseUrl = 'https://www.themuse.com/api/public/jobs';
  private readonly localStorageKey = 'savedJobApplications';
  constructor(private http: HttpClient) {}

  /**
   * ✅ Fetch job categories dynamically
   */
  getJobCategories(page: number = 1): Observable<string[]> {
    const url = `${this.baseUrl}?page=${page}`; // ✅ Dynamically append page

    console.log('Fetching job categories from:', url); // Debugging

    return this.http.get<any>(url).pipe(
      map(response => {
        if (!response.results || !Array.isArray(response.results)) {
          console.error('Invalid API response format:', response);
          return [];
        }

        const uniqueCategories = Array.from(
          new Set(
            response.results
              .flatMap((job: any) =>
                job.categories?.map((c: { name: string }) => c.name) || []
              )
          )
        ) as string[];

        return uniqueCategories;
      }),
      catchError(error => {
        console.error('Error fetching job categories:', error);
        return throwError(() => new Error('Failed to fetch job categories'));
      })
    );
  }

  /**
   * ✅ Fetch job listings
   */

  getJobs(page: number = 1): Observable<JobApplication[]> {
    
    const url = `${this.baseUrl}?page=${page}`; // ✅ Dynamically append page

    console.log('Fetching jobs from:', url); // Debugging

    return this.http.get<{ results: any[] }>(url).pipe(
      map(response => {
        if (!response.results || !Array.isArray(response.results)) {
          console.error('Invalid API response format:', response);
          return [];
        }

        return response.results.map(job => ({
          id: job.id ?? 0,
          title: job.name ?? 'No Title',
          company: job.company?.name ?? 'Unknown',
          category: job.categories?.[0]?.name ?? 'Unknown',
          status: 'Applied',
        })) as JobApplication[];
      }),
      catchError(error => {
        console.error('Error fetching job listings:', error);
        return throwError(() => new Error('Failed to fetch jobs'));
      })
    );
  }

  /**
   * ✅ Fetch job applications (⚠️ Check why `/job-applications` was appended)
   */
  getJobApplications(): Observable<JobApplication[]> {
    const url = `${this.baseUrl}`; // ✅ Removed incorrect `/job-applications`

    console.log('Fetching job applications from:', url); // Debugging

    return this.http.get<JobApplication[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching job applications:', error);
        return throwError(() => new Error('Failed to fetch job applications'));
      })
    );
  }
}
