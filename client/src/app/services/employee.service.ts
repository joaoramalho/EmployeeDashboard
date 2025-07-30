import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserList } from "../model/user-list";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root'})
export class EmployeeService {
    private employeeList$ = new BehaviorSubject<UserList[]>([]);
    public employees$ = this.employeeList$.asObservable();
    private http = inject(HttpClient);

    getEmployeeList(): Observable<UserList[]>{
        return this.http.get<UserList[]>('http://localhost:5294/api/employees', { params: { pageSize: 10 }});
    }

    loadEmployees(): Observable<UserList[]> {
        const storage = localStorage.getItem('Employees');
        
        if(storage){
            const employees = JSON.parse(storage) as UserList[];
            this.employeeList$.next(employees);
            return this.employeeList$;
        }

        return this.getEmployeeList().pipe(
            tap(employees => {
                this.saveFavouritesToStorage(employees);
                this.employeeList$.next(employees);
            })
        );
    }

    updateEmployeeFavourite(email: string, favourite: boolean): void {
        const currentEmployees = this.employeeList$.value;
        const updatedEmployees = currentEmployees.map(emp => 
            emp.email === email ? { ...emp, favourite } : emp
        );
        this.employeeList$.next(updatedEmployees);
        
        // Persist to localStorage
        this.saveFavouritesToStorage(updatedEmployees);
    }

    private saveFavouritesToStorage(employees: UserList[]): void {
        localStorage.setItem('Employees', JSON.stringify(employees));
    }

    loadFavouritesFromStorage(): string[] {
        const stored = localStorage.getItem('Employees');
        return stored ? JSON.parse(stored) : [];
    }

    getEmployeeNotes(email: string){
        return this.http.get<string[]>(`http://localhost:5294/api/employees/${email}/notes`);
    }

    saveNote(email: string, note: string): Observable<string[]>{
        return this.http.post<string[]>(`http://localhost:5294/api/employees/${email}/notes`, { note: note});
    }
}