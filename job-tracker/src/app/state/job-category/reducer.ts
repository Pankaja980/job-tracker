import { createReducer, on } from '@ngrx/store';
//import * as JobCategoryActions from './../job-category/actions';
//import { JobCategory } from '../../models/job-category';
import { loadJobCategories, loadJobCategoriesSuccess, loadJobCategoriesFailure } from './actions';
export interface JobCategoryState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: JobCategoryState = {
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
  }))
);
