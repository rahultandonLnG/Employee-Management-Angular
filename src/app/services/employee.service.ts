import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private readonly storeName = 'employees';

    constructor(private dbService: NgxIndexedDBService) {
        this.initObjectStore();
    }

    private initObjectStore(): void {
        const objectStoreMeta: ObjectStoreMeta = {
            store: this.storeName,
            storeConfig: { keyPath: 'id', autoIncrement: true, version: 2 },
            storeSchema: [
                { name: 'firstName', keypath: 'firstName', options: { unique: false } },
                { name: 'lastName', keypath: 'lastName', options: { unique: false } },
                { name: 'email', keypath: 'email', options: { unique: true } },
                { name: 'department', keypath: 'department', options: { unique: false } },
                { name: 'gender', keypath: 'gender', options: { unique: false } },
                { name: 'permanent', keypath: 'permanent', options: { unique: false } }
            ]
        };
        this.dbService.createObjectStore(objectStoreMeta);
    }

    addEmployee(employee: Employee): Observable<boolean> {
        return this.dbService.getByIndex(this.storeName, 'email', employee.email).pipe(
            switchMap(existingEmployee => {
                if (existingEmployee) {
                    return throwError(() => new Error('Duplicate'));
                } else {
                    return this.dbService.add(this.storeName, employee).pipe(
                        map(() => true)
                    );
                }
            })
        );
    }

    getEmployees(): Observable<Employee[]> {
        return this.dbService.getAll(this.storeName);
    }

    updateEmployee(employee: Employee): void {
        this.dbService.update(this.storeName, employee).subscribe(() => {
            console.log('Employee updated successfully');
        });
    }

    deleteEmployee(id: number): void {
        this.dbService.delete(this.storeName, id).subscribe(() => {
            console.log('Employee deleted successfully');
        });
    }
}
