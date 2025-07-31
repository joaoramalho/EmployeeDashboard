import { Component, inject, OnInit, signal, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { UserList } from '../model/user-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserNotesCardComponent } from '../user-notes-card/user-notes-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, filter } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatButtonModule, DatePipe, UserNotesCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = signal<UserList | null>(null);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  employeeService = inject(EmployeeService);
  private snackbar = inject(MatSnackBar);

  ngOnInit(){
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.employeeService.employees$
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(employees => {
            return employees.length > 0;
          }),
          map(employees => {
            const user = employees.find(emp => emp.email === email);
            return user || null;
          })
        )
        .subscribe(user => {
          this.user.set(user);
        });

      // Ensure data is loaded if BehaviorSubject is empty
      this.employeeService.employees$
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(employees => employees.length === 0)
        )
        .subscribe(() => {
          this.employeeService.loadEmployees()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
        });
    }
  }

  setFavourite(){
    this.employeeService.updateEmployeeFavourite(this.user()!.email, !this.user()!.favourite);
    this.snackbar.open(`${this.user()!.name} is now ${!this.user()!.favourite ? 'a favourite' : 'unfavourite'}`, '', { duration: 5000 });
  }

  getUserNotes(){
    return this.employeeService.getEmployeeNotes(this.user()!.email);
  }
}