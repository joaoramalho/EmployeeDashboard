import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
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

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, ErrorRetryComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  searchInput = new FormControl('');
  displayedColumns: string[] = ['name', 'email', 'dob', 'favourite'];
  dataSource: UserList[] = [];
  originalData: UserList[] = [];
  skeletonData: any[] = Array(5).fill({});
  isLoading = signal(true);
  hasError = signal(false);
  employeeService = inject(EmployeeService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(){
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(value => this.filter(value));

    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading.set(true);
    this.hasError.set(false);
    
    this.employeeService.getEmployeeList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: userList => {
          this.originalData = userList;
          this.dataSource = userList;
          this.isLoading.set(false);
        },
        error: error => {
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
      this.dataSource = this.originalData;
    } else {
      this.dataSource = this.originalData.filter(x => 
        x.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
  }
}