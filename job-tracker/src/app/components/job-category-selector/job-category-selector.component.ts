import { Component,EventEmitter, inject, OnInit, Output,Input } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
//import { JobCategoryService } from '../../services/job-category.service';
import { JobCategory } from '../../models/job-category';
// interface JobCategory {
//   name: string; // ✅ Ensure JobCategory has a 'name' property
// }
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
//import { JobCategory } from '../../models/job-category';
import { loadJobs } from '../../state/job-category/actions';
import { selectJobCategories, selectJobState } from '../../state/job-category/selector';
@Component({
  selector: 'app-job-category-selector',
  imports: [CommonModule],
  templateUrl: './job-category-selector.component.html',
  styleUrl: './job-category-selector.component.css',
  //providers: [JobCategoryService],
})
export class JobCategorySelectorComponent implements OnInit {
  jobCategories$!: Observable<string[] >;
  //selectedCategory: string = '';
   constructor(private store: Store){}

  @Input() selectedCategory: string = '';

  @Output() selectedCategoryChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.jobCategories$ = this.store.select(selectJobCategories);
    //this.store.dispatch(loadJobCategories());
  }

  onCategorySelect(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.selectedCategoryChange.emit(selectedCategory);
  }
}
  //private jobCategoryService = inject(JobCategoryService);
  // private apiUrl = 'https://www.themuse.com/api/public/jobs';

  // constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchJobCategories();
//   }

//   fetchJobCategories(): void {
//     this.http.get<{ results: any[] }>(this.apiUrl).subscribe(response => {
//       this.categories = response.results
//         .map(job => job.categories?.[0]?.name)
//         .filter((category, index, self) => category && self.indexOf(category) === index);
//     });
//   }

//   onCategoryChange(event: Event): void {
//     const target = event.target as HTMLSelectElement;
//     this.selectedCategory = target.value;
//     this.categorySelected.emit(this.selectedCategory);
//   }
// }
/*ngOnInit() {
  this.jobCategoryService.getJobCategories().subscribe(categories => {
    
    this.categories = [...new Set(categories.map(category => category.name))]; // ✅ Remove duplicates
    });
  };


onCategoryChange(event: Event) {
  //const selectElement = event.target as HTMLSelectElement;
  const selectedCategory = (event.target as HTMLSelectElement).value;
   this.categorySelected.emit(selectedCategory);*/
// 
//   if (selectElement) {
//     this.selectedCategory = selectElement.value;
//     this.categorySelected.emit(this.selectedCategory);
// }
// }
// }
// // import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-job-category-selector',
//   standalone: true,
//   imports: [CommonModule], // ✅ Import CommonModule since we don't have app.module.ts
//   templateUrl: './job-category-selector.component.html',
//   styleUrls: ['./job-category-selector.component.css']
// })
// export class JobCategorySelectorComponent implements OnInit {
//   @Output() categorySelected = new EventEmitter<string>(); // ✅ Output event
//   private http = inject(HttpClient); // ✅ Inject HttpClient

//   categories: string[] = []; // ✅ Store unique categories
//   private apiUrl = 'https://www.themuse.com/api/public/jobs?page=1'; // ✅ API URL

//   ngOnInit() {
//     this.fetchJobCategories().subscribe(categories => {
//       this.categories = categories;
//     });
//   }

//   fetchJobCategories(): Observable<string[]> {
//     return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
//       map(response => {
//         const uniqueCategories = new Set<string>();
//         response.results.forEach(job => {
//           if (job.categories) {
//             job.categories.forEach((category: { name: string }) => uniqueCategories.add(category.name));
//           }
//         });
//         return Array.from(uniqueCategories); // ✅ Convert Set to Array
//       })
//     );
//   }

//   selectCategory(category: string) {
//     this.categorySelected.emit(category); // ✅ Emit selected category
//   }
// }
