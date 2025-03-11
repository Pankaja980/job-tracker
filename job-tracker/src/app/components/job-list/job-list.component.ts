import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map,startWith } from 'rxjs';
import { Job } from '../../models/job';
import { selectJobs } from '../../state/job-category/selector';
import { loadJobs ,deleteJob,updateJob,addJob } from '../../state/job-category/actions';
import { JobItemComponent } from '../job-item/job-item.component';
import { JobFormComponent } from '../job-form/job-form.component';
import { JobCategorySelectorComponent } from '../job-category-selector/job-category-selector.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { JobService } from '../../services/job.service';
import { ToastModule } from 'primeng/toast';
import { JobApplication } from '../../models/job.model';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    DialogModule,
     ChartModule,
      //JobItemComponent,
       JobFormComponent,
        JobCategorySelectorComponent,
      ToastModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  private store = inject(Store);
  private messageService = inject(MessageService);
  private jobService=inject(JobService)

  filteredJobs:Job[]=[];
  displayDialog: boolean = false;
  // Fetch jobs from NgRx store
  jobs$: Observable<Job[]> = this.store.select(selectJobs);
  chartOptions: any;

  // Signal for selected job (editing mode)
  selectedJob = signal<Job | null>(null);
  isEditing = computed(() => this.selectedJob() !== null);

  // Available application statuses
  statuses = ['Applied', 'Interview Scheduled', 'Rejected', 'Offer Received'];
  selectedStatus = signal<string>('All'); // Default: Show all jobs
  constructor() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Job Applications Summary',
        },
      },
    };
  }
  // Computed filtered jobs based on selected status
   filteredJobs$ : Observable<Job[]> = this.jobs$.pipe(//=this.jobs$.pipe(        //= computed(() =>
    map(jobs =>Array.isArray( jobs) 
   ? this.selectedStatus() === 'All' 
   ? jobs : jobs.filter(job => job.status === this.selectedStatus())
   : []),
   startWith([]) // Ensures the observable starts with an empty array
 );
  //     map(jobs => 
  //       jobs && jobs.length > 0 ?
  //       (this.selectedStatus() === 'All'
  //         ? jobs
  //         : jobs.filter(job => job.status === this.selectedStatus()))
  //         :[]
  //     ),
  //     startWith([])
  //   );
  

  // Computed job summary (reduce function)
  jobSummary$: Observable<{ status: string; count: number }[]> = this.jobs$.pipe( 
    
      map(jobs =>
        this.statuses.map(status => ({
          status,
          count: jobs.filter(job => job.status === status).length,
        }))
      )
    );
  

  // Chart data for job summary
  chartData$ : Observable<any> = this.jobSummary$.pipe(
    map(jobSummary => ({
    labels: this.statuses,
    datasets: [
      {
        data: jobSummary.map(s => s.count),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
      },
    ],
  }))
);

openDialog() {
  this.displayDialog = true;
}

// Function to close the dialog
closeDialog() {
  this.displayDialog = false;
}

  ngOnInit() {
    // ✅ Fetch jobs from API
    // this.filteredJobs$.subscribe(jobs => {
    //   this.filteredJobs = jobs || []; // Ensures filteredJobs is always an array
    //   console.log("filtered Jobs:",jobs);
    this.jobs$.subscribe(jobs => {console.log(" Jobs in Store:", jobs)
      if (!jobs || jobs.length === 0) {
        console.warn("⚠️ No jobs found in store. Check if `loadJobs` action is dispatched.");
      }
    });

  // ✅ Debugging: Check filtered jobs
  this.filteredJobs$.subscribe(jobs =>{

  console.log(" Filtered Jobs:", jobs)});
  //    this.jobService.getJobs().subscribe({
  //    //this.store.dispatch(loadJobs({jobs}));
  //   // this.jobService.getJobs().subscribe(
  //   //   (data:Job[])=>{
  //   //     this.filteredJobs=[...new Map(data.map(job=>[job.id,job])).values()];
  //   //     console.log('API Response:',this.filteredJobs);
  //   //     this.jobSummary$;
  //   //   },
  //      next: (jobs: Job[]) => {
  //      console.log("API response before dispatching:", jobs);
  //     //   if (Array.isArray(jobs)) {
  //          this.store.dispatch(loadJobs({ jobs }));
  //     //     console.log("Api response",jobs)
  //     //   } else {
  //     //     console.error("Unexpected API response format:", jobs);
  //     //   }
  //      },
  //      (error) => {
  //       console.error("Error fetching jobs:", error);
  //     }
  // );
  this.jobService.getJobs().subscribe({
    next: (jobs: Job[]) => {
      console.log('API Response:', jobs);
      this.store.dispatch(loadJobs({ jobs })); // ✅ Dispatch jobs to store
    },
    error: (error) => console.error("Error fetching jobs:", error),
  });
  
}


  // Open job form for editing
  editJob(job: Job) {
    this.selectedJob.set(job);
    this.displayDialog=true;
  }

  // Close job form
  closeJobForm() {
    this.selectedJob.set(null);
    this.displayDialog=false;
  }

  // Show success notification
  showToast(message: string) {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: message, 
      life: 3000 });
  }
  // deleteJob(jobId: number) {
  //   this.store.dispatch(deleteJob({ jobId }));
  // }
  deleteJob(job: Job) {
    if (confirm(`Are you sure you want to delete ${job.title}?`)) {
      this.store.dispatch(deleteJob({ jobId: job.id }));
      this.showToast('Job deleted successfully');
    }
  }
  saveJob(job: Job) {
    if (this.selectedJob()) {
      // Update the existing job
      this.store.dispatch(updateJob({ job })); // Assuming `updateJob` action exists
      this.showToast('Job updated successfully!');
    } else {
      // Add new job
      this.store.dispatch(addJob({ job })); // Assuming `addJob` action exists
      this.showToast('Job added successfully!');
    }
  
    // Close the job form
    this.closeJobForm();
  }
  
  
}
