import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobCategorySelectorComponent } from '../job-category-selector/job-category-selector.component';
import { JobApplication } from '../../services/job.service';
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
  @Input() job: JobApplication = { id: 0, title: '', company: '', status: '', category: '' };
  @Output() saveJob = new EventEmitter<JobApplication>();

  onSubmit() {
    this.saveJob.emit(this.job);
  }
}