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
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, ErrorRetryComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'dob', 'favourite'];
  dataSource: UserList[] = [];
  skeletonData: any[] = Array(5).fill({});
  isLoading = signal(true);
  hasError = signal(false);
  employeeService = inject(EmployeeService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(){
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading.set(true);
    this.hasError.set(false);
    
    this.employeeService.getEmployeeList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: userList => {
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
}