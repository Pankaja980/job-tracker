import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore,provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { jobFeature, jobCategoryFeature } from './app/state/job-category/reducer';
import { JobEffects } from './app/state/job-category/effects';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), 
    provideStore({}),
    provideState(jobFeature), 
    provideState(jobCategoryFeature),
     provideEffects(JobEffects), 
     provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })] 
})
  .catch((err) => console.error(err));