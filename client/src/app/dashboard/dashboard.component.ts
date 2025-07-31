import { Component, inject, signal, OnInit, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserList } from '../model/user-list';
import { EmployeeService } from '../services/employee.service';
import { ErrorRetryComponent } from '../error-retry/error-retry.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, ErrorRetryComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  searchInput = new FormControl('');
  displayedColumns: string[] = ['name', 'email', 'dob', 'favourite'];
  dataSource = signal<UserList[]>([]);
  filteredData = signal<UserList[]>([]);
  skeletonData: any[] = Array(5).fill({});
  isLoading = signal(true);
  hasError = signal(false);
  employeeService = inject(EmployeeService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  ngOnInit(){
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(value => this.filter(value));

    this.employeeService.employees$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(employees => {
        this.dataSource.set(employees);
        this.filteredData.set(employees);
        this.isLoading.set(false);
        if (employees.length === 0) {
          this.loadEmployees();
        }
      });
  }

  private loadEmployees() {
    this.isLoading.set(true);
    this.hasError.set(false);
    
    this.employeeService.loadEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading employees:', error);
          this.isLoading.set(false);
          this.hasError.set(true);
        }
      });
  }

  onRetry() {
    this.loadEmployees();
  }

  onRowClick(user: UserList) {
    this.router.navigate(['/user-profile', user.email]);
  }

  filter(searchTerm: string | null){
    if(!searchTerm || searchTerm.trim() === ''){
      this.filteredData.set(this.dataSource());
    } else {
      this.filteredData.set(this.dataSource().filter(x => 
        x.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
      ));
    }
  }

  toggleFavourite(event: Event, employee: UserList){
    event.stopPropagation();
    this.employeeService.updateEmployeeFavourite(employee.email, !employee.favourite);
    this.snackbar.open(`${employee.name} is now ${!employee.favourite ? 'a favourite' : 'unfavourite'}`, '', { duration: 5000 });
  }
}