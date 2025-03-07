import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { JobCategoryService } from '../../services/job-category.service';
import * as JobCategoryActions from './../job-category/actions';

@Injectable()
export class JobCategoryEffects {
  loadJobCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobCategoryActions.loadJobCategories),
      mergeMap(() =>
        this.jobCategoryService.getJobCategories().pipe(
          map(categories => JobCategoryActions.loadJobCategoriesSuccess({ categories })),
          catchError(error => of(JobCategoryActions.loadJobCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private jobCategoryService: JobCategoryService) {}
}
