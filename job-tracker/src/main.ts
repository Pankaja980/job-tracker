import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideStore(), provideEffects(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })] 
})
  .catch((err) => console.error(err));