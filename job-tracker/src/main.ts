import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore,provideState,StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

//import { jobFeature, jobCategoryFeature } from './app/state/job-category/reducer';
import { JobEffects } from './app/state/job-category/effects';
import { jobReducer } from './app/state/job-category/reducer';  // ✅ Ensure the correct path


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), 
    provideStore({ job: jobReducer }),
    //provideState(jobFeature), 
    //provideState(jobCategoryFeature),
    provideEffects([JobEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
    MessageService,
    provideRouter(routes)] 
})
  .catch((err) => console.error(err));