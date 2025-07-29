import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserList } from '../model/user-list';
import { EmployeeService } from '../services/employee.service';

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
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  displayedColumns: string[] = ['name', 'email', 'dob', 'favourite'];
  dataSource: UserList[] = [];
  employeeService = inject(EmployeeService);

  ngOnInit(){
    this.employeeService.getEmployeeList().subscribe(x => {
      this.dataSource = x;
    })
  }
}