import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessage, ToastService } from '../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss']
})
export class ToastComponent implements OnInit {

  toast?: ToastMessage;
  visible = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe((toast) => {
      this.toast = toast;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }
}