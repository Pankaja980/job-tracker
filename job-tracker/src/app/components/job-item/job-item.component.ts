import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApplication } from '../../services/job.service';

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