import { TestBed } from '@angular/core/testing';

import { JobService } from './job-category.service';

describe('JobCategoryService', () => {
  let service: JobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
