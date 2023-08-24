import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeUpdateModalComponent } from '../employee-update-modal/employee-update-modal.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  confirmationMessage!: string;
  selectedEmployee: Employee | null = null;
  searchQuery: string = '';
  filteredEmployees: Employee[] = [];
  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.loadEmployees();
    this.filteredEmployees = this.employees;
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = this.employees;
    });
  }

  openUpdateModal(employee: Employee): void {
    this.selectedEmployee = { ...employee };

    const modalRef = this.modalService.open(EmployeeUpdateModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employee = this.selectedEmployee;
  }


  deleteEmployee(employee: Employee): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete employee ${employee.firstName} ${employee.lastName}?`;

    modalRef.result.then((result) => {
      if (result === 'confirmed') {
        this.employeeService.deleteEmployee(employee.id);
        this.loadEmployees();
      }
    }).catch(() => {
    });
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => {
      return (
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.gender.toLowerCase().includes(query)
      );
    });
  }
}

