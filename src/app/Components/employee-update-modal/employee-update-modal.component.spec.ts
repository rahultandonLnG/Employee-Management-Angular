import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateModalComponent } from './employee-update-modal.component';

describe('EmployeeUpdateModalComponent', () => {
  let component: EmployeeUpdateModalComponent;
  let fixture: ComponentFixture<EmployeeUpdateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeUpdateModalComponent]
    });
    fixture = TestBed.createComponent(EmployeeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
