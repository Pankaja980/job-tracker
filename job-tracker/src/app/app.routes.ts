import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobListComponent }, // Job listing page
  { path: 'add-job', component: JobFormComponent }, // Add new job
  { path: 'edit-job/:id', component: JobFormComponent }, // Edit job with a given ID
  { path: '**', redirectTo: 'jobs' } // Redirect unknown routes
];
