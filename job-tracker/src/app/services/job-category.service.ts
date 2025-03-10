import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, map, throwError } from 'rxjs';
//import { map } from 'rxjs/operators';
//import { JobCategory } from '../models/job-category';
import { Job } from '../models/job';
import { JobApplication } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://www.themuse.com/api/public/jobs?page=1';

  constructor(private http: HttpClient) {}

//   fetchJobCategories(): Observable<string[]> {
//     return this.http.get<any>(this.apiUrl).pipe(
//       map(response => {
//         const uniqueCategories = [...new Set(response.results.map((job: any) => job.categories[0]?.name).filter(Boolean))];
//         return uniqueCategories;
//       }),
//       catchError(error => {
//         console.error('Error fetching job categories:', error);
//         return throwError(() => new Error('Failed to fetch job categories'));
//       })
//     );
//   }
// }
// fetchJobCategories(): Observable<string[]> {
//   return this.http.get<any>(this.apiUrl).pipe(
//     map(response => {
//       const uniqueCategories: string[] = [
//         ...new Set(
//           response.results
//             .flatMap((job: any) => job.categories?.map((c: {name:string}) => c.name) || [] )
//             //.filter((name: string | undefined): name is string => Boolean(name))
//         ),
//       ];
//       return uniqueCategories;
//     }),
//     catchError(error => {
//       console.error('Error fetching job categories:', error);
//       return throwError(() => new Error('Failed to fetch job categories'));
//     })
//   );
// }
getJobs(): Observable<string[]> {
  return this.http.get<any>(this.apiUrl).pipe(
    map(response => {
      // Ensure categories exist and extract their names
      const uniqueCategories = Array.from(
        new Set(
          response.results
            .flatMap((job: any) =>
              job.categories?.map((c: { name: string }) => c.name) || []
            )
        )
      ) as string[]; // ✅ Explicitly cast as string[]
      
      return uniqueCategories;
    }),
    catchError(error => {
      console.error('Error fetching job categories:', error);
      return throwError(() => new Error('Failed to fetch job categories'));
    })
  );
}
getJobApplications(): Observable<JobApplication[]> {
  return this.http.get<JobApplication[]>(`${this.apiUrl}/job-applications`);
}

}
