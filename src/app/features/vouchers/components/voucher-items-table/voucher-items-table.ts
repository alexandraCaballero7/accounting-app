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

  // lista de items que vienen del componente padre
  @Input() items: VoucherItemRequest[] = [];

  // evento para editar
  @Output() editItem = new EventEmitter<VoucherItemRequest>();

  // evento para eliminar
  @Output() deleteItem = new EventEmitter<number>();

  onEdit(item: VoucherItemRequest) {
    this.editItem.emit(item);
  }

  onDelete(index: number) {
    this.deleteItem.emit(index);
  }

  getTypeLabel(type: number): string {
    return type === 1 ? 'Debit' : 'Credit';
  }

}