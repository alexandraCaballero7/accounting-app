export class VoucherResponse {
  voucherId!: number;
  voucherNumber!: number;
  employeeId!: number;
  totalAmount!: number;
  description!: string | null;
  Employee!: EmployeeVoucherResponse;
  Items!: VoucherItemRequest[];
  
}

export class VoucherItemRequest {
  voucherItemId!: number;
  description!: string | null;
  amount!: number;
  type!: number;
}

export class EmployeeVoucherResponse {
  employeeId!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  hireDate!: Date;
  salary!: number;
}
