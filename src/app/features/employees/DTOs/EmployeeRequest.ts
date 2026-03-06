export class EmployeeRequest {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  hireDate!: Date;
  salary!: number;
}

export class EmployeeFormRequest {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  hireDate!: string;
  salary!: number;
}