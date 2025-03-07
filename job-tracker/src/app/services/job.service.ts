import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { JobApplication } from '../../models/job.model';
export interface JobApplication {
  id: number;
  title: string;
  company: string;
  status: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl ="https://www.themuse.com/api/public/jobs?page=1" ; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map(response => {
        console.log('API Response:', response); // ✅ Debug API response

        if (!Array.isArray(response.results)) {
          console.warn('Invalid API response format:', response);
          return [];
        }

        return response.results.map(job => ({
          id: job.id ?? 0, // Ensure ID is always a number
          title: job.name ?? 'No title provided', // Handle missing title
          company: job.company?.name ?? 'Unknown', // Handle missing company
          status: 'Open' 
        }));
      })
    );
  }
}