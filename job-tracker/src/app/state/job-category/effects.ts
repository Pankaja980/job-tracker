import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { JobCategoryService } from '../../services/job-category.service';
//import * as JobCategoryActions from './../job-category/actions';
import { loadJobCategories, loadJobCategoriesSuccess, loadJobCategoriesFailure } from './actions';

@Injectable()
export class JobCategoryEffects {
  loadJobCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJobCategories),
      mergeMap(() =>
        this.jobCategoryService.fetchJobCategories().pipe(
          map(categories => loadJobCategoriesSuccess({ categories })),
          catchError(error => of(loadJobCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private jobCategoryService: JobCategoryService) {}
}
