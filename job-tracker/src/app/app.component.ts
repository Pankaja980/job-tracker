import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';
import { provideStore } from '@ngrx/store';
import { jobReducer } from './state/job-category/reducer';
import { provideEffects } from '@ngrx/effects';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { bootstrapApplication } from '@angular/platform-browser';
//import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, JobListComponent,
    ToastModule
  ], // ✅ Import JobListComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    MessageService,  // ✅ Provide PrimeNG ToastService
    //provideStore({jobState: jobReducer}), // ✅ Register NgRx Store
    //provideEffects([]), 
  ],
})
export class AppComponent {
  title = 'Job Application Tracker';
}
// bootstrapApplication(AppComponent, {
//   providers: [
//     //provideStore({ jobState: jobReducer }),
//     provideEffects([]),
//     MessageService
//   ]
// }).catch(err => console.error(err));