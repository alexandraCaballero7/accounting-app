// src/app/core/services/loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private requestsInProgress = 0;

  show() {
    this.requestsInProgress++;
    if (this.requestsInProgress > 0) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    this.requestsInProgress--;
    if (this.requestsInProgress <= 0) {
      this.requestsInProgress = 0;
      this.loadingSubject.next(false);
    }
  }
}