import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobCategoryState } from '../job-category/reducer';

// ✅ Select the job category feature state
export const selectJobCategoryState = createFeatureSelector<JobCategoryState>('jobCategory');

// ✅ Select job categories from the state
export const selectJobCategories = createSelector(
  selectJobCategoryState,
  (state) => state.categories
);

// ✅ Select jobs from the state
export const selectJob = createSelector(
  selectJobCategoryState,
  (state) => state.categories
);
