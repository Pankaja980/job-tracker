import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jobCategoryFeature, JobState } from '../job-category/reducer';
import { Job } from '../../models/job';
import { JobCategoryState } from './reducer';

// ✅ Select the job category feature state
export const selectJobState = createFeatureSelector<JobState>('jobState');//jobCategoryFeature.selectJobCategoryState;//createFeatureSelector<JobState>('jobCategory');

// ✅ Select job categories from the state
//export const selectJobs = jobCategoryFeature.selectJobs;//createSelector(
//   selectJobState,
//   (state) => state.jobs
// );
export const selectJobs = createSelector(
  selectJobState,
  (state) => {
    console.log("📌 NgRx State:", state); // ✅ Debug: Log the entire state
    return state?.jobs || []; // Ensure it returns an array
  }
);
export const selectJobCategoryState = createFeatureSelector<JobCategoryState>('jobCategory');

// ✅ Select job categories from the state
export const selectJobCategories = createSelector(
  selectJobCategoryState,
  (state) => state.categories
);
// ✅ Select jobs from the state
// export const selectJob = createSelector(
//   selectJobCategoryState,
//   (state) => state.categories
// );
export const selectAllJobs = createSelector(
  selectJobState,
  (state) => state.jobs // Ensure 'jobs' exist in the state
);
export const selectJobsByStatus = (status: string) =>
  createSelector(selectJobState, (state:JobState) => 
    //if (!state || !state.jobs) return []; // ✅ Prevent undefined errors
    state?.jobs?.filter(job => job.status === status) || []
  );
    
  export const selectFormattedJobs = createSelector(
    selectJobState,
    (state) => state.jobs.map((job) => ({
      title: `🔹 ${job.title}`, 
      company: job.company.toUpperCase(), 
      status: `📌 ${job.status}`
    }))
  );
  export const selectJobSummary = createSelector(
    selectJobState,
    (state) => state.jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );
  
  