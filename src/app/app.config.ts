import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { inject } from '@vercel/analytics';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Logger } from './logger.service'; // Import the Logger service

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    // provideHttpClient(
    //   withFetch()
    // ),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject({ mode: isDevMode() ? 'development' : 'production' });
      },
    },
    Logger, // Add the Logger service to the providers array
  ],
};
