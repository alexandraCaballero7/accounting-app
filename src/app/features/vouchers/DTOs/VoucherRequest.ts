export class VoucherRequest {
  voucherNumber!: number;
  employeeId!: number;
  totalAmount!: number;
  description!: string | null;
  Items!: VoucherItemRequest[];
}

export class VoucherItemRequest {
  description!: string | null;
  amount!: number;
  type!: number;
}