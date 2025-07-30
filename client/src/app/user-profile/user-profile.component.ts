import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { UserDetail } from '../model/user-detail';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = signal<UserDetail | null>(null);
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);

  ngOnInit(){
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.employeeService.getEmployeeDetail(email).subscribe(userData => {
        this.user.set(userData);
      });
    }
  }
}