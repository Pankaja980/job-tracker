// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { JobItemComponent } from '../job-item/job-item.component';
// import { JobService} from '../../services/job.service';
// import { HttpClientModule } from '@angular/common/http';
// import { JobFormComponent} from '../job-form/job-form.component';
// import { JobApplication } from '../../services/job.service';

// @Component({
//   selector: 'app-job-list',
//   standalone: true, // ✅ Standalone component
//   imports: [CommonModule, JobItemComponent, HttpClientModule,JobFormComponent], // ✅ Import dependencies
//   templateUrl: './job-list.component.html',
//   styleUrls: ['./job-list.component.css']
// })
// export class JobListComponent implements OnInit {
//   jobApplications: JobApplication[] = [];
//   selectedJob: JobApplication | null = null;
//   newJob: JobApplication = { id: 0, title: '', company: '', status: '' };
//   editingJob: JobApplication | null = null;
//   errorMessage: string = '';
//   constructor(private jobService: JobService) {}

//   ngOnInit(): void {
//     // this.fetchJobs();
//     this.jobService.getJobApplications().subscribe(jobs => this.jobApplications = jobs);
//   }

//   // fetchJobs(): void {
//   //   this.jobService.getJobApplications().subscribe({
//   //     next: (data) => (this.jobApplications = Array.isArray(data) ? data : []),
//   //     error: (error) => console.error('Error fetching jobs:', error)
//   //   });
//   // }
//   addNewJob() {
//     this.selectedJob = { id: 0, title: '', company: '', status: '' };
//   }

//   editJob(job: JobApplication) {
//     this.selectedJob = { ...job }; // Clone to avoid direct mutation
//   }

//   saveJob(updatedJob: JobApplication) {
// //     if (job.id === 0) {
// //       job.id = this.jobApplications.length + 1;
// //       this.jobApplications.push(job);
// //     } else {
// //       const index = this.jobApplications.findIndex((j) => j.id === job.id);
// //       if (index > -1) {
// //         this.jobApplications[index] = job;
// //       }
// //     }
// //     this.selectedJob = null; // Hide form after save
// //   }
// // }
// const index = this.jobApplications.findIndex(j => j.id === updatedJob.id);
//     if (index !== -1) {
//       this.jobApplications[index] = updatedJob;
//     } else {
//       this.jobApplications.push(updatedJob);
//     }
//     this.selectedJob = null; // Hide form after save
//   }
// }
import { Component, OnInit, inject } from '@angular/core';
import { Store ,provideState} from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFormattedJobs, selectJobsByStatus, selectJobSummary } from '../../state/job-category/selector';
import { Job } from '../../models/job';
import { JobApplication, JobService } from '../../services/job.service';  // Import JobApplication
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from '../job-item/job-item.component';
import { jobFeature, jobReducer } from '../../state/job-category/reducer';
import { loadJobs } from '../../state/job-category/actions';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  imports:[JobItemComponent,CommonModule],
  //providers: [provideState(jobFeature)]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  // appliedJobs$!: Observable<Job[]>;
  // interviewJobs$!: Observable<Job[]>;
  // rejectedJobs$!: Observable<Job[]>;
  // offerJobs$!: Observable<Job[]>;
  // formattedJobs$!: Observable<{ title: string; company: string; status: string }[]>;
  // jobSummary$!: Observable<Record<string, number>>;

  appliedJobs: Job[] = [];
  interviewJobs: Job[] = [];
  rejectedJobs: Job[] = [];
  offerJobs: Job[] = [];
  //store = inject(Store);

  formattedJobs: { title: string; company: string; status: string }[] = []; // ✅ Formatted jobs
  jobSummary: Record<string, number> = {};
  constructor(private store: Store, private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }
  fetchJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (!response.results || !Array.isArray(response.results)) {
          console.error('Invalid job data structure:', response);
          return;
        }
    //     this.jobs = response.results.map(job => ({;  // ✅ Extract jobs from `results`
    //     // this.categorizeJobs();
    //     // this.formatJobs();
    //     // this.generateJobSummary();
    //     // this.jobs = response.results.map(job => ({
    //       id:job.id ??Math.random(),
    //       title: job.name,  // ✅ Extract correct job title
    //       company: job.company.name,  // ✅ Extract company name
    //       category: job.categories.length ? job.categories[0].name : 'Unknown',
    //       location: job.locations.length ? job.locations[0].name : 'Remote',
    //       level: job.levels.length ? job.levels[0].name : 'Not Specified',
    //       status: 'Applied'  // ✅ Default status if not provided
    //     }));
      
    
    //   error: (error) => console.error('Error fetching jobs:', error)
    // });
    this.jobs = response.results.map(job => ({
      id: job.id ?? Math.random(), // ✅ Assign a unique ID if missing
      title: job.title ?? 'No Title',  // ✅ API may use `name`
      company:job.company && typeof job.company === 'object' && 'name' in job.company 
      ? (job.company as { name: string }).name 
      : 'Unknown',// typeof job.company === 'object' ? job.company?.name ?? 'Unknown' : job.company ?? 'Unknown',// job.company?.name ?? 'Unknown',  
      category: Array.isArray(job.category) ? job.category?.[0]?.name ?? 'Unknown' : job.category ?? 'Unknown', //job.category?.[0]?.name ?? 'Unknown',
      //location: job.locations?.[0]?.name ?? 'Remote',
      //level: job.levels?.[0]?.name ?? 'Not Specified',
      status: 'Applied'  // ✅ Default status
    }));

    console.log('Formatted Jobs:', this.jobs); // ✅ Verify the formatted output
  },
  error: (error) => console.error('Error fetching jobs:', error)
});
  }
  private categorizeJobs(): void {
    this.appliedJobs = this.filterJobsByStatus("Applied");
    this.interviewJobs = this.filterJobsByStatus("Interview Scheduled");
    this.rejectedJobs = this.filterJobsByStatus("Rejected");
    this.offerJobs = this.filterJobsByStatus("Offer Received");
  }

  private filterJobsByStatus(status: string): Job[] {
    return this.jobs.filter(job => job.status === status);
  }

  private formatJobs(): void {
    this.formattedJobs = this.jobs.map(job => ({
      title: job.title,
      company: job.company,
      status: job.status
    }));
  }

  private generateJobSummary(): void {
    this.jobSummary = this.jobs.reduce((summary, job) => {
      summary[job.status] = (summary[job.status] || 0) + 1;
      return summary;
    }, {} as Record<string, number>);
  }
}

    //this.store.dispatch(loadJobs({ job }));
  //   this.jobService.getJobs().subscribe((
  //     jobs: Job[]) => {
  //     this.store.dispatch(loadJobs({ jobs })); // ✅ Dispatch with fetched jobs
  //   });
  //   this.appliedJobs$ = this.store.select(selectJobsByStatus('Applied') || []).pipe(
  //     map(jobs => this.convertJobApplications(jobs))
  //   );
  //   this.interviewJobs$ = this.store.select(selectJobsByStatus('Interview Scheduled') || []).pipe(
  //     map(jobs => this.convertJobApplications(jobs))
  //   );
  //   this.rejectedJobs$ = this.store.select(selectJobsByStatus('Rejected') || []).pipe(
  //     map(jobs => this.convertJobApplications(jobs))
  //   );
  //   this.offerJobs$ = this.store.select(selectJobsByStatus('Offer Received') || []).pipe(
  //     map(jobs => this.convertJobApplications(jobs))
  //   );
  //   this.formattedJobs$ = this.store.select(selectFormattedJobs);
  //   this.jobSummary$ = this.store.select(selectJobSummary);
  // }
  // private convertJobApplications(jobs: JobApplication[]): Job[] {
  //   return jobs.map(job => ({
  //     id: job.id,
  //     title: job.title,
  //     company: job.company,
  //     category: job.category,
  //     status: this.normalizeStatus(job.status) // ✅ Ensure status is correctly mapped
  //   }));
  // }
  // private normalizeStatus(status: string): Job['status'] {
  //   const validStatuses: Job['status'][] = ["Applied", "Interview Scheduled", "Rejected", "Offer Received"];
  //   return validStatuses.includes(status as Job['status']) ? status as Job['status'] : "Applied"; // Default to 'Applied'
  // }
