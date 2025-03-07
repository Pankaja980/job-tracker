import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobCategory } from '../models/job-category';

@Injectable({
  providedIn: 'root',
})
export class JobCategoryService {
  private apiUrl = 'https://www.themuse.com/api/public/jobs?page=1';

  constructor(private http: HttpClient) {}

  getJobCategories(): Observable<JobCategory[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map(response => {
        const categories = response.results
          .map(job => job.categories?.map((category:JobCategory) => category.name))
          .flat()
          .filter((category, index, self) => category && self.indexOf(category) === index);

        return categories.map((name, index) => ({ id: index + 1, name }));
      })
    );
  }
}