import { ApplicationConfig, provideBrowserGlobalErrorListeners, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMarkdown, SANITIZE } from 'ngx-markdown';
import { HttpClient, provideHttpClient } from '@angular/common/http'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(), 
    provideMarkdown({ loader: HttpClient ,
      sanitize: {
        provide: SANITIZE,
        useValue: SecurityContext.HTML 
      }
    }),
  ]
};
