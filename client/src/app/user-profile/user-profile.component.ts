import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { UserList } from '../model/user-list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = signal<UserList | null>(null);
  private route = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);
  private snackbar = inject(MatSnackBar);

  ngOnInit(){
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      const users = JSON.parse(localStorage.getItem('Employees')!) as UserList[];
      this.user.set(users.filter(x => x.email === email)[0]);
    }
  }

  setFavourite(){
    this.employeeService.updateEmployeeFavourite(this.user()!.email, !this.user()!.favourite);
    this.snackbar.open(`${this.user()!.name} is now ${!this.user()!.favourite ? 'a favourite' : 'unfavourite'}`, '', { duration: 5000 });
  }
}