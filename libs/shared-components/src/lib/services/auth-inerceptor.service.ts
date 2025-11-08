import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

let isReloading = false; // Защита от двойной перезагрузки

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError((error: any) => {
      if ((error.status === 403 || error.status === 401) && !isReloading) {
        isReloading = true;
        console.warn('403 Forbidden: Сессия истекла. Очищаем localStorage и перезагружаем...');

        localStorage.clear();

        setTimeout(() => {
          location.reload();
        }, 100);
      }

      return new Observable<HttpEvent<any>>(observer => {
        observer.error(error);
      });
    })
  );
};
