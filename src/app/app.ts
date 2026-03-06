import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner';
import { Navbar } from './shared/navbar/navbar';
import { ToastComponent } from './shared/components/toast/toast';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-root',
  imports: [  
    RouterOutlet,
    LoadingSpinnerComponent,
    Navbar,
    ToastComponent,
    ConfirmDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('accounting-app');
}
