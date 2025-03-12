import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApplication } from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule], // ✅ Import dependencies
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent {
  @Input() job!: JobApplication;
}