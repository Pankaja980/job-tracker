import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { Job } from '../../models/job';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
  standalone: true, // ✅ Standalone component mode
  imports: [DropdownModule,FormsModule,
    CommonModule,ReactiveFormsModule
  ] // ✅ Ensure proper module imports
})
export class JobFormComponent implements OnInit {
  @Input() job: Job | null = null;
  @Input() jobLevels: string[] = []; // 🔹 Job levels passed as input
  @Output() jobSaved = new EventEmitter<Job>();

  jobForm!: FormGroup;
  levelOptions: { label: string; value: string }[] = []; // 🔹 Pre-processed dropdown options
  statusOptions: { label: string; value: string }[] = []; // 🔹 Pre-processed status options
  selectedJobLevel: string = ''; 
  selectedJobStatus: string = ''; 
  jobStatuses: string[] = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // ✅ Prepare dropdown options in TypeScript instead of the template
    this.levelOptions = this.jobLevels.map(l => ({ label: l, value: l }));
    this.statusOptions = ['Applied', 'Interview Scheduled', 'Rejected', 'Offer Received']
      .map(s => ({ label: s, value: s }));

    // ✅ Initialize reactive form
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      level: ['', Validators.required],
      status: ['', Validators.required]
    });

    // ✅ Populate form if job is provided
    if (this.job) {
      this.jobForm.patchValue({
        name: this.job.name,
        company: this.job.company.name,
        level: this.job.levels[0]?.name || '',
        status: this.job.status || ''
      });
    }
  }

  saveJob(): void {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      const savedJob: Job = {
        id: this.job?.id || Math.floor(Math.random() * 1000), // Assign ID if new job
        name: formData.name,
        company: { name: formData.company },
        levels: [{ name: formData.level }],
        status: formData.status
      };
      this.jobSaved.emit(savedJob);
    }
    
  }
}
