import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { JobService } from '../../services/job.service';
//import * as JobCategoryActions from './../job-category/actions';
//import { loadJobCategories, loadJobCategoriesSuccess, loadJobCategoriesFailure } from './actions';
import { loadJobs } from './actions';

@Injectable({
  providedIn:'root',
})
export class JobEffects {
  private actions$ = inject(Actions);
  private jobService = inject(JobService);
  loadJobCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJobs),
      mergeMap(() =>
        this.jobService.getJobApplications().pipe(
          map(jobs => ({ type: '[Job] Load Jobs Success', jobs })),
          catchError((error) => of({ type: '[Job] Load Jobs Failure', error }))
        )
      )
    )
  );

  //constructor(private actions$: Actions, private jobService: JobService) {}
}
