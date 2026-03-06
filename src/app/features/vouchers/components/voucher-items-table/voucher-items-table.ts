import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherItemRequest } from '../../DTOs/VoucherRequest';

@Component({
  selector: 'app-voucher-items-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voucher-items-table.html',
  styleUrl: './voucher-items-table.scss',
})
export class VoucherItemsTable {
  @Input() readonly = false;
  @Input() items: VoucherItemRequest[] = [];
  @Output() editItem = new EventEmitter<{ item: VoucherItemRequest, index: number }>();
  @Output() deleteItem = new EventEmitter<number>();



  onEdit(item: VoucherItemRequest, index: number) {
    this.editItem.emit({ item, index });
  }

  onDelete(index: number) {
    this.deleteItem.emit(index);
  }

  getTypeLabel(type: number): string {
    return type === 0 ? 'Debit' : 'Credit';
  }

}