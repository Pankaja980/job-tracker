import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,map} from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl = 'https://www.themuse.com/api/public/jobs';

  constructor(private http: HttpClient) {}

  getJobLevels(): Observable<string[]> {
   // return this.http.get<string[]>(`${this.baseUrl}/levels`);
   return this.getJobs().pipe(
    map((jobs: Job[]) => 
      [...new Set(jobs.flatMap(job => job.levels.map(level => level.name)))] // Extract unique levels
    )
  );
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<{ results: Job[] }>(`${this.baseUrl}?page=1`).pipe(
      map(response => response.results) // Extract jobs from API response
    );
  }
}
