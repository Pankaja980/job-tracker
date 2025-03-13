import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Job } from '../../models/job';
import * as JobActions from '../../state/job-category/actions';
import { selectJobs } from '../../state/job-category/selector';
import { JobFormComponent } from '../job-form/job-form.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule,FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { JobCategorySelectorComponent } from '../job-category-selector/job-category-selector.component';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule, TableModule, DialogModule, ToastModule, 
    ChartModule, ButtonModule, ConfirmDialogModule, DropdownModule, 
    FormsModule, JobFormComponent, JobCategorySelectorComponent
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  jobs$: Observable<Job[]>;
  filteredJobs$: Observable<Job[]> = new Observable();

  selectedLevelSubject = new BehaviorSubject<string>('');
  selectedLevel$ = this.selectedLevelSubject.asObservable();
  selectedStatus: string = '';
  isEditMode: boolean = false;
  jobForm: FormGroup;
  jobStatuses = ['Applied', 'Interview Scheduled', 'Rejected', 'Offer Received'];

  jobStatusOptions = this.jobStatuses.map(status => ({ label: status, value: status }));

  selectedJob: Job | null = null;
  displayDialog: boolean = false;


  levelChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  levelChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  constructor(private store: Store, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.jobs$ = this.store.select(selectJobs);
    this.jobForm = new FormGroup({
      title: new FormControl(''),
      company: new FormControl(''),
      jobLevel: new FormControl(''),
      jobStatus: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.store.dispatch(JobActions.loadJobs());

    
    this.jobs$.subscribe(jobs => {
      this.updateChart(jobs); // Updates chart only when job list changes
    });

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredJobs$ = this.jobs$.pipe(
      map(jobs => {
        return jobs.filter(job =>
          (this.selectedLevelSubject.value ? job.levels.some(l => l.name === this.selectedLevelSubject.value) : true) &&
          (this.selectedStatus ? job.status === this.selectedStatus : true)
        );
      })
    );
  }

  updateChart(jobs: Job[]): void {
    const levelCounts: { [key: string]: number } = {};

    jobs.forEach(job => {
      job.levels.forEach(level => {
        levelCounts[level.name] = (levelCounts[level.name] || 0) + 1;
      });
    });

    this.levelChartData = {
      labels: Object.keys(levelCounts),
      datasets: [
        {
          label: 'Job Levels',
          data: Object.values(levelCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']
        }
      ]
    };
  }

  getJobLevels(job: Job): string {
    return job.levels?.map(level => level.name).join(', ') || 'N/A';
  }

  onLevelChange(level: string): void {
    this.selectedLevelSubject.next(level);
    this.applyFilters();
  }

  // onStatusChange(job: Job, status: string): void {
  //   this.store.dispatch(JobActions.updateJob({ job: { ...job, status } }));
  //   this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Job status updated successfully' });
  // }
  onStatusChange(job: Job, status: string): void {
    const updatedJob = { ...job, status }; // Create a new job object
    this.store.dispatch(JobActions.updateJob({ job: updatedJob })); // Dispatch updated job
    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Job status updated successfully' });
  }
  

  addJob(): void {
    this.selectedJob = null;
    this.displayDialog = true;
  }

  editJob(job: Job): void {
    this.selectedJob = { ...job };
    this.isEditMode = true;
    this.displayDialog = true;
    this.jobForm.patchValue({ 
      title: job.name, 
      company: job.company, 
      jobLevel: job.name, 
      jobStatus: job.status 
    });
  }

  confirmDelete(job: Job): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${job.name}"?`,
      accept: () => {
        this.deleteJob(job);
      }
    });
  }

  deleteJob(job: Job): void {
    this.store.dispatch(JobActions.deleteJob({ id: job.id }));
    this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Job deleted successfully' });
    this.displayDialog = true;
  }

  onJobSave(job: Job): void {
  //   if (job.id) {
  //     this.store.dispatch(JobActions.updateJob({ job }));
  //     this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Job updated successfully' });
  //   } else {
  //     this.store.dispatch(JobActions.addJob({ job }));
  //     this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Job added successfully' });
  //   }
  //   this.displayDialog = false;
  // }
  if (this.isEditMode) {
    this.store.dispatch(JobActions.updateJob({ job }));
    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Job updated successfully' });
  } else {
    this.store.dispatch(JobActions.addJob({ job }));
    this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Job added successfully' });
  }
  this.isEditMode = false; // Reset edit mode
  this.displayDialog = false;
}
}
