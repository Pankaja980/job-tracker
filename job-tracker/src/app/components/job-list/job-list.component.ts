import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from '../job-item/job-item.component';
import { JobService} from '../../services/job.service';
import { HttpClientModule } from '@angular/common/http';
import { JobFormComponent} from '../job-form/job-form.component';
import { JobApplication } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, JobItemComponent, HttpClientModule,JobFormComponent], // ✅ Import dependencies
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobApplications: JobApplication[] = [];
  selectedJob: JobApplication | null = null;
  newJob: JobApplication = { id: 0, title: '', company: '', status: '' };
  editingJob: JobApplication | null = null;
  errorMessage: string = '';
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    // this.fetchJobs();
    this.jobService.getJobApplications().subscribe(jobs => this.jobApplications = jobs);
  }

  // fetchJobs(): void {
  //   this.jobService.getJobApplications().subscribe({
  //     next: (data) => (this.jobApplications = Array.isArray(data) ? data : []),
  //     error: (error) => console.error('Error fetching jobs:', error)
  //   });
  // }
  addNewJob() {
    this.selectedJob = { id: 0, title: '', company: '', status: '' };
  }

  editJob(job: JobApplication) {
    this.selectedJob = { ...job }; // Clone to avoid direct mutation
  }

  saveJob(updatedJob: JobApplication) {
//     if (job.id === 0) {
//       job.id = this.jobApplications.length + 1;
//       this.jobApplications.push(job);
//     } else {
//       const index = this.jobApplications.findIndex((j) => j.id === job.id);
//       if (index > -1) {
//         this.jobApplications[index] = job;
//       }
//     }
//     this.selectedJob = null; // Hide form after save
//   }
// }
const index = this.jobApplications.findIndex(j => j.id === updatedJob.id);
    if (index !== -1) {
      this.jobApplications[index] = updatedJob;
    } else {
      this.jobApplications.push(updatedJob);
    }
    this.selectedJob = null; // Hide form after save
  }
}