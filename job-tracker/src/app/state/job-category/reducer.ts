import { createReducer, on } from '@ngrx/store';
import * as JobActions from './actions';
import { Job } from '../../models/job';


export interface JobState {
  jobLevels: string[];
  jobs: Job[];
}

const initialState: JobState = {
  jobLevels: [],
  jobs: [],
};

export const jobReducer = createReducer(
  initialState,
  on(JobActions.loadJobLevelsSuccess, (state, { levels }) => ({
    ...state,
    jobLevels: levels,
  })),
  on(JobActions.loadJobsSuccess, (state, { jobs }) => ({
    ...state,
    jobs: jobs,
  }))
);
