import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
})
export class GenericTableComponent<T extends object> {

  @Input() data: T[] = [];
  @Input() columns: { key: string; label: string }[] = [];

  @Output() view = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  searchTerm = '';

  get filteredData(): T[] {
    if (!this.searchTerm) return this.data;

    const term = this.searchTerm.toLowerCase();

    return this.data.filter(row =>
      this.columns.some(col => {
        const value = this.resolveValue(row, col.key);
        return String(value ?? '')
          .toLowerCase()
          .includes(term);
      })
    );
  }

  resolveValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  trackByFn(index: number): number {
    return index;
  }
}