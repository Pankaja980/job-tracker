import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobCategorySelectorComponent } from '../job-category-selector/job-category-selector.component';
//import { JobApplication } from '../../services/job.service';
import { Job } from '../../models/job';
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
  onCategorySelected(event: any) {
    if(this.job){
    this.job.category = event;
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