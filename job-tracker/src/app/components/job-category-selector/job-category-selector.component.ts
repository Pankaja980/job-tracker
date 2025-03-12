import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectJobCategories } from '../../state/job-category/selector';

@Component({
  selector: 'app-job-category-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-category-selector.component.html',
  styleUrl: './job-category-selector.component.css',
})
export class JobCategorySelectorComponent implements OnInit {
  jobCategories$!: Observable<string[]>;
  filteredCategories: string[] = [];

  @Input() selectedCategory: string = '';
  @Output() selectedCategoryChange = new EventEmitter<string>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.jobCategories$ = this.store.select(selectJobCategories);
    this.jobCategories$.subscribe((categories) => {
      this.filteredCategories = categories;
    });
  }

  onCategoryInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.selectedCategory = input;
    this.selectedCategoryChange.emit(input);

    // Filter categories based on user input
    this.jobCategories$.subscribe((categories) => {
      this.filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(input.toLowerCase())
      );
    });
  }
}
