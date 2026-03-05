import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../../shared/components/services/toast'; 

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Unexpected error occurred';

      if (error.status === 0) {
        message = 'Cannot connect to server';
      } else if (error.status === 400) {
        message = error.error?.message ?? 'Bad request';
      } else if (error.status === 404) {
        message = 'Resource not found';
      } else if (error.status === 500) {
        message = 'Internal server error';
      }

      
      toast.error(message);

      return throwError(() => error);
    })
  );
};