// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
//
// bootstrapApplication(App, appConfig).catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app/app-routing.module';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from "../../../libs/shared-components/src/lib/services/auth-inerceptor.service";

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
}).catch(err => console.error(err));
