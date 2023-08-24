import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  showSuccessAlert: boolean = false;
  showUpdatedRecordAlert: boolean = false;
  duplicateEmailError: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      if (params['updated']) {
        this.showUpdatedRecordAlert = true;
        setTimeout(() => {
          this.showUpdatedRecordAlert = false;
          this.router.navigate([], { queryParams: { updated: null }, queryParamsHandling: 'merge' });
        }, 2000);
      }
    });
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      permanent: [false],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe({
        next: () => {
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 2000);
          this.employeeForm.reset();
        },
        error: (error) => {
          if (error.message === 'Duplicate') {
            this.duplicateEmailError = true;
            setTimeout(() => {
              this.duplicateEmailError = false;
            }, 2000);
          }
        },
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
