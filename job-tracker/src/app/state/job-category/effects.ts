import { Injectable,inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as JobActions from './actions';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn:'root',
})

export class JobEffects {
  
  private actions$= inject (Actions);
  private jobService= inject(JobService);
  private store=inject(Store);

  loadJobLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobLevels),
      mergeMap(() =>
        this.jobService.getJobLevels().pipe(
          map((levels) => JobActions.loadJobLevelsSuccess({ levels })),
          catchError(() => of({ type: '[Job] Load Job Levels Failed' }))
        )
      )
    )
  );

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobs),
      mergeMap(() =>
        this.jobService.getJobs().pipe(
          map((jobs:Job[]) => JobActions.loadJobsSuccess({ jobs })),
          catchError(() => of({ type: '[Job] Load Jobs Failed' }))
        )
      )
    )
  );
}
