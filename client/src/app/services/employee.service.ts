import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserList } from "../model/user-list";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class EmployeeService {
    private http = inject(HttpClient);

    getEmployeeList(): Observable<UserList[]>{
        return this.http.get<UserList[]>('http://localhost:5294/api/employees', { params: { pageSize: 10 }});
    }
}