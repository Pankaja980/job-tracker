import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategorySelectorComponent } from './job-category-selector.component';

describe('JobCategorySelectorComponent', () => {
  let component: JobCategorySelectorComponent;
  let fixture: ComponentFixture<JobCategorySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCategorySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
