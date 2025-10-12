// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
//
// bootstrapApplication(App, appConfig).catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
