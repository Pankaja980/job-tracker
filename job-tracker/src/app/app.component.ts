import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, JobListComponent], // ✅ Import JobListComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Job Application Tracker';
}