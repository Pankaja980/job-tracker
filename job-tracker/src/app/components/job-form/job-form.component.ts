import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobCategorySelectorComponent } from '../job-category-selector/job-category-selector.component';
//import { JobApplication } from '../../services/job.service';
import { Job } from '../../models/job';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
// export interface JobApplication {
//   id: number;
//   title: string;
//   company: string;
//   status: string;
// }

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule,JobCategorySelectorComponent],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent {
  @Input() job!: Job | null;//JobApplication = { id: 0, title: '', company: '', status: '', category: '' };
  @Output() save = new EventEmitter<Job>();
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    // Load saved values from localStorage
    if (!this.job) {
      this.job = {
        id: 0,
        title: localStorage.getItem('jobTitle') || '',
        company: localStorage.getItem('jobCompany') || '',
        category: localStorage.getItem('jobCategory') || '',
        status: (localStorage.getItem('jobStatus') as 'Applied'| "Interview Scheduled" | "Rejected" | "Offer Received") || 'Applied'
      };
    }
  }
  onCategorySelected(event: any) {
    if(this.job){
    this.job.category = event;
    localStorage.setItem('jobCategory', event);
  }
}
onInputChange(field: string, value: string): void {
  if (this.job) {
    (this.job as any)[field] = value;
    localStorage.setItem(field, value); // Save to localStorage
  }
}
  onSubmit() {
    if (this.job){
    this.save.emit(this.job);
  }
}
onClose() {
  this.close.emit();
}
}