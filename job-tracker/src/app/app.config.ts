import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { jobCategoryReducer } from './state/job-category/reducer';
//import { JobCategoryEffects } from './state/job-category/effects';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ jobCategory: jobCategoryReducer }),
    //provideEffects(JobCategoryEffects),
    provideHttpClient()
  ],
};
// import { ApplicationConfig } from '@angular/core';
// import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Provide HttpClient globally
// import { provideRouter } from '@angular/router';
// //import { appRoutes } from './app.routes'; // ✅ Import routes
// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { jobReducer } from './state/job-category/reducer';
// import { JobEffects } from './job/state/job-effects';

// export const appConfig: ApplicationConfig = {
//   providers: [
//    // provideRouter(appRoutes), // ✅ Provides routing
//     provideHttpClient(withFetch()), // ✅ Provides HttpClient globally
//     provideStore({ job: jobReducer }), // ✅ Provides NgRx store
//     provideEffects(JobEffects) // ✅ Provides NgRx effects
//   ]

