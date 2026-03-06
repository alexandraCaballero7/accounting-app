import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
visible = false;
  message = '';
  confirmAction: (() => void) | null = null;

  open(message: string, confirmAction: () => void) {
    this.message = message;
    this.confirmAction = confirmAction;
    this.visible = true;
  }

  confirm() {
    if (this.confirmAction) {
      this.confirmAction();
    }

    this.reset();
  }

  cancel() {
    this.reset();
  }

  private reset() {
    this.visible = false;
    this.message = '';
    this.confirmAction = null;
  }

}
