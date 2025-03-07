import { createReducer, on } from '@ngrx/store';
import * as JobCategoryActions from './../job-category/actions';
import { JobCategory } from '../../models/job-category';

export interface JobCategoryState {
  categories: JobCategory[];
  error: string | null;
}

const initialState: JobCategoryState = {
  categories: [],
  error: null,
};

export const jobCategoryReducer = createReducer(
  initialState,
  on(JobCategoryActions.loadJobCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    error: null,
  })),
  on(JobCategoryActions.loadJobCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
