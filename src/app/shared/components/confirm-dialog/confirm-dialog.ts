import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../services/confirm-dialog';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
})
export class ConfirmDialogComponent {
 message = '';
  visible = false;

  constructor(public dialog: ConfirmDialogService) {}

  confirm() {
    this.dialog.confirm();
  }

  cancel() {
    this.dialog.cancel();
  }
}