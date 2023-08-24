import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-update-modal',
  templateUrl: './employee-update-modal.component.html',
  styleUrls: ['./employee-update-modal.component.css']
})
export class EmployeeUpdateModalComponent {
  @Input() employee: Employee | null = null;


  employeeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [''],
      gender: ['', Validators.required],
      permanent: [false]
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = { ...this.employee, ...this.employeeForm.value };
      this.employeeService.updateEmployee(updatedEmployee);
      this.activeModal.close();
      this.router.navigate(['/add'], { queryParams: { updated: true } });
    }
  }
}
