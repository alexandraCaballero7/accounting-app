import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { Observable } from 'rxjs';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
      provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingInterceptor, errorInterceptor])) 

  ]
};


