import { createAction, props } from '@ngrx/store';
import { JobCategory } from '../../models/job-category';

import { Job } from '../../models/job';

// ✅ Load Jobs Action
export const loadJobs = createAction(
  '[Job] Load Jobs',
  props<{ jobs: Job[] }>()
);
console.log("loadJobs action defined",loadJobs);
export const loadJobsSuccess = createAction(
  '[Job] Load Jobs Success',
  props<{ jobs: Job[] }>()
);
export const loadJobsFailure = createAction(
  '[Job] Load Jobs Failure',
  props<{ error: string }>()
);

export const loadJobCategories = createAction('[Job Category] Load Categories');
export const loadJobCategoriesSuccess = createAction(
  '[Job Category] Load Categories Success',
  props<{ categories: string[] }>()
);
export const loadJobCategoriesFailure = createAction(
  '[Job Category] Load Categories Failure',
  props<{ error: string }>()
);
export const deleteJob = createAction(
  '[Job] Delete Job',
  props<{ jobId: number }>()
);
export const updateJob = createAction(
  '[Job List] Update Job',
  props<{ job: Job }>()
);
export const addJob = createAction(
  '[Job List] Add Job',
  props<{ job: Job }>()
);

