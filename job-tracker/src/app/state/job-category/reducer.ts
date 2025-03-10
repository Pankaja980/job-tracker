import { createFeature, createReducer, on } from '@ngrx/store';
//import * as JobCategoryActions from './../job-category/actions';
//import { JobCategory } from '../../models/job-category';
import { loadJobCategories, loadJobCategoriesSuccess, loadJobCategoriesFailure } from './actions';
import { JobApplication } from '../../models/job.model';
import { Job } from '../../models/job';
import {loadJobs} from './actions'
// export interface JobCategoryState {
//   categories: string[];
//   loading: boolean;
//   error: string | null;
//   //jobs: JobApplication[];
// }

// const initialState: JobCategoryState = {
//   categories: [],
//   loading: false,
//   error: null,
//   jobs: [],
// };
// const initialJobCategoryState: JobCategoryState = {
//   categories: [],
//   loading: false,
//   error: null,
// };
export interface JobState {
  jobs: Job[];
}

const initialState: JobState = {
  jobs: []  // ✅ Ensure state is initialized
};

export const jobReducer = createReducer(
  initialState,
  on(loadJobs, (state, { jobs }) => ({ ...state, jobs }))
);

export interface JobCategoryState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialJobCategoryState: JobCategoryState = {
  categories: [],
  loading: false,
  error: null,
};
export const jobCategoryReducer = createReducer(
  initialState,
  on(loadJobCategories, state => ({ ...state, loading: true, error: null })),
  on(loadJobCategoriesSuccess, (state, { categories }) => ({
    ...state,
    loading:false,
    categories,
    //error: null,
  })),
  on(loadJobCategoriesFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error,
  })),
)
// export const jobReducer = createReducer(
//   initialState,
//   on(loadJobs, (state, { jobs }) => ({ ...state, jobs }))
// );
export const jobFeature = createFeature({
  name: 'job',
  reducer: jobReducer,
});
export const jobCategoryFeature = createFeature({ // ✅ Ensure jobCategoryFeature is created
  name: 'jobCategory', // ✅ Feature name must match selector key
  reducer: jobCategoryReducer,
});
