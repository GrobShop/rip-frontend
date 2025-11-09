// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { firstValueFrom } from 'rxjs';
//
// let isReloading = false;
//
// export async function withTokenRefresh<T>(
//   httpClient: HttpClient,
//   requestFactory: (headers: HttpHeaders) => Observable<T>
// ): Promise<T> {
//   // Получаем заголовки снаружи (через AuthHeadersService)
//   const headers = await getHeadersFromService();
//
//   return firstValueFrom(
//     requestFactory(headers).pipe(
//       catchError(err => {
//         if ((err.status === 401 || err.status === 403) && !isReloading) {
//           handleLogout();
//         }
//         const message = err.error?.error || err.message || 'Ошибка сервера';
//         return throwError(() => new Error(message));
//       })
//     )
//   );
// }
//
// // Вспомогательная функция — можно вынести или импортировать AuthHeadersService
// async function getHeadersFromService(): Promise<HttpHeaders> {
//   // Динамический импорт, чтобы не было циклических зависимостей
//   const { AuthHeadersService } = await import('../../../../../apps/admin/src/services/routes/auth/auth-headers.service');
//   return await AuthHeadersService.getAuthHeaders();
// }
//
// // Глобальный логаут
// function handleLogout() {
//   if (isReloading) return;
//   isReloading = true;
//
//   console.warn('401/403: Сессия истекла. Выход...');
//   localStorage.clear();
//
//   setTimeout(() => {
//     location.reload();
//   }, 100);
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

let isReloading = false;

export async function withTokenRefresh<T>(
  httpClient: HttpClient,
  requestFactory: (headers: HttpHeaders) => Observable<T>
): Promise<T> {
  // Получаем заголовки СНАРУЖИ
  const headers = await getHeadersFromService();

  return firstValueFrom(
    requestFactory(headers).pipe(
      catchError(err => {
        if ((err.status === 401 || err.status === 403) && !isReloading) {
          handleLogout();
        }
        const message = err.error?.error || err.message || 'Ошибка сервера';
        return throwError(() => new Error(message));
      })
    )
  );
}

async function getHeadersFromService(): Promise<HttpHeaders> {
  const { AuthHeadersService } = await import('../../../../../apps/admin/src/services/routes/auth/auth-headers.service');
  return await AuthHeadersService.getAuthHeaders();
}

function handleLogout() {
  if (isReloading) return;
  isReloading = true;
  console.warn('401/403: Сессия истекла. Выход...');
  localStorage.clear();
  setTimeout(() => location.reload(), 100);
}
