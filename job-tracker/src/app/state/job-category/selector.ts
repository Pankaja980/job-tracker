import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JobState } from './reducer';


export const selectJobState = createFeatureSelector<JobState>('job');

export const selectJobLevels = createSelector(
  //(state: AppState) => state.job, // Ensure 'jobs' slice exists
  selectJobState,
  (jobState: JobState) => jobState?.jobLevels ?? [] 
);

export const selectJobs = createSelector(
  selectJobState,
  (state:JobState) => state?.jobs || []
);
