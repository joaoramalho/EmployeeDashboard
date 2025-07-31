import { Component, DestroyRef, inject, OnInit, signal, ChangeDetectionStrategy } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { map, take, filter, switchMap } from "rxjs";
import { UserList } from "../model/user-list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'favourites',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCardModule, MatIconModule, MatListModule, MatButtonModule, RouterModule, DatePipe],
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
    employeeService = inject(EmployeeService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);  
    favouriteEmployees = signal<UserList[]>([]);
    isLoading = signal(true);

    ngOnInit(): void {
        // Wait until we have data, then filter favourites
        this.employeeService.employees$
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                switchMap(employees => {
                    if (employees.length === 0) {
                        return this.employeeService.loadEmployees();
                    }
                    return [employees];
                }),
                map(employees => {
                    const favourites = employees.filter(emp => emp.favourite);
                    return favourites;
                })
            )
            .subscribe(favourites => {
                this.favouriteEmployees.set(favourites);
                this.isLoading.set(false);
            });
    }

    viewProfile(employee: UserList) {
        this.router.navigate(['/user-profile', employee.email]);
    }
}