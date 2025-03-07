import { createAction, props } from '@ngrx/store';
import { JobCategory } from '../../models/job-category';

export const loadJobCategories = createAction('[Job Category] Load Categories');
export const loadJobCategoriesSuccess = createAction(
  '[Job Category] Load Categories Success',
  props<{ categories: string[] }>()
);
export const loadJobCategoriesFailure = createAction(
  '[Job Category] Load Categories Failure',
  props<{ error: string }>()
);
